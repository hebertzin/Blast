import express, { Request, Response, Express } from 'express'
import { upload } from './routes/upload'
import { loggerService } from './config/logger/winston'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { HttpStatusCode } from './utils/http-status'

export class ExpressApp {
  private expressApp: Express

  constructor() {
    this.expressApp = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.expressApp.use(helmet())
    this.expressApp.use(compression())
    this.expressApp.use(express.json())
    this.expressApp.use(express.urlencoded({ extended: true, limit: '50mb' }))
    this.expressApp.use(
      morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ].join(' ')
      }),
    )
  }

  private routes() {
    this.expressApp.use('/api/v1', upload)

    this.expressApp.get('/health', (req: Request, res: Response) => {
      return res.status(HttpStatusCode.Ok).json({
        status: 'up',
        message: 'Aplication is alive!',
        path: req.path,
        timestamp: new Date().toISOString(),
      })
    })
  }

  public start(port: number) {
    return this.expressApp.listen(port, () => {
      loggerService.info('Sever is running !')
    })
  }

  public getApp(): Express {
    return this.expressApp
  }
}

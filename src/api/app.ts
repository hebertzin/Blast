import express, { Express } from 'express'
import { uploadManagementRoutes } from './presentation/routes/upload'
import { logging } from '../core/infra/config/logging/winston'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

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
    this.expressApp.use('/api/v1', uploadManagementRoutes)
  }

  public start(port: number) {
    return this.expressApp.listen(port, () => {
      logging.info(`Sever is running on por ${port}!`)
    })
  }

  public getApp(): Express {
    return this.expressApp
  }
}

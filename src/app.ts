import express, { Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { env } from './config/env'
import { upload } from './routes/upload'
import { logger } from './config/logger/winston'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(helmet())

app.use(
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

app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'up',
    message: 'Aplication is alive!',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/v1', upload)

app.listen(env.PORT, () => {
  logger.info('Server is running')
})

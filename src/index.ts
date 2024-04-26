import express from 'express'
import { env } from './config/env'
import { upload } from './routes/upload'
import { logger } from './config/logger/winston'

const app = express()

app.use(express.json())

app.use('/api/v1', upload)

app.listen(env.PORT, () => {
  logger.info('Server is running')
})

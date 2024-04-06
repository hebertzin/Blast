import express from 'express'
import { env } from './env'
import { upload } from './routes/upload'

const app = express()

app.use(express.json())
app.use(upload)

app.listen(env.PORT, () => {
  console.log(`server is running`)
})

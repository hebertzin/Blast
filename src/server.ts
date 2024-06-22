import { ExpressApp } from './app'
import { env } from './config/env'

export const app = new ExpressApp()

const port = env.PORT || 5000
app.start(port)

import { ExpressApp } from './app'
import { appConfig } from './config/config'

export const app = new ExpressApp()

app.start(appConfig.port)

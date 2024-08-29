import { Request, Response } from 'express'
import { ListFilesService } from '../services/list-all-files-service'
import { s3 } from '../aws'
import { HttpStatusCode } from '../utils/http-status'
import { loggerService } from '../config/logger/winston'
import { redis } from '../redis'

export class ListFilesController {
  private listFilesService: ListFilesService

  constructor(listFiles: ListFilesService) {
    this.listFilesService = listFiles
  }
  public async handle(_req: Request, res: Response): Promise<Response> {
    try {
      const files = await this.listFilesService.invoke()
      return res.status(HttpStatusCode.Ok).json({
        files: files,
      })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const listFilesControllerHandler = new ListFilesController(
  new ListFilesService(s3, loggerService, redis),
)

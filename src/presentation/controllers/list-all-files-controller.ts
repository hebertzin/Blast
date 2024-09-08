import { Request, Response } from 'express'
import { ListFilesService } from '../../application/usecases/list-all-files-service'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'

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

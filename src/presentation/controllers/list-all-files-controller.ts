import { Request, Response } from 'express'
import {
  IListFilesUseCase,
  ListFilesUseCase,
} from '../../application/usecases/list-files-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'

export class ListFilesController {
  constructor(readonly listFilesUseCase: IListFilesUseCase) {}
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = await this.listFilesUseCase.invoke()
      return res.status(HttpStatusCode.Ok).json({
        files: files,
      })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const listFilesControllerHandler = new ListFilesController(
  new ListFilesUseCase(s3, loggerService, redis),
)

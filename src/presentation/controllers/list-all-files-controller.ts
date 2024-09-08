import { Request, Response } from 'express'
import {
  IListFilesUseCase,
  ListFilesUseCase,
} from '../../application/usecases/list-files-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'
import { Controller, HttpResponse } from '../../domain/controller'

export class ListFilesController implements Controller {
  constructor(readonly listFilesUseCase: IListFilesUseCase) {}
  public async handle(req: Request): Promise<HttpResponse> {
    try {
      const files = await this.listFilesUseCase.invoke()
      return {
        statusCode: HttpStatusCode.Ok,
        msg: 'All files',
        body: files,
      }
    } catch (error) {
      return { msg: error.message, statusCode: error.statusCode }
    }
  }
}

export const listFilesControllerHandler = new ListFilesController(
  new ListFilesUseCase(s3, loggerService, redis),
)

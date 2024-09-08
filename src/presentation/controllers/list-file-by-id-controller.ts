import { Request, Response } from 'express'
import {
  IListFileByIdUseCase,
  ListFileByIdUseCase,
} from '../../application/usecases/list-file-by-id-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'
import { Controller, HttpResponse } from '../../domain/controller'

export class ListFileByIdController implements Controller {
  constructor(readonly listFileByIdUseCase: IListFileByIdUseCase) {}
  public async handle(req: Request): Promise<HttpResponse> {
    try {
      const { id } = req.params
      const fileDetails = await this.listFileByIdUseCase.invoke(id)
      return {
        msg: 'File by id',
        statusCode: HttpStatusCode.Ok,
        body: fileDetails,
      }
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      }
    }
  }
}

export const listFileByIdService = new ListFileByIdUseCase(
  s3,
  loggerService,
  redis,
)

export const listFileByIdControllerHandler = new ListFileByIdController(
  listFileByIdService,
)

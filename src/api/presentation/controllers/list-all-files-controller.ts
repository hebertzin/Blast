import { Request } from 'express'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domain/controller'
import { HttpStatusCode } from '../../../core/application/domain/http-status'
import { IListFilesUseCase } from '../../../core/application/usecases/list-files-use-case'

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

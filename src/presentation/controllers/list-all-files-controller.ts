import { Request } from 'express'
import { IListFilesUseCase } from '../../application/usecases/list-files-use-case'
import { HttpStatusCode } from '../../domain/http-status'
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

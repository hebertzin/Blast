import { Request } from 'express'
import { HttpStatusCode } from '../../../core/application/domains/http-status'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domains/controller'
import { IDeleteFileUseCase } from '../../../core/application/domains/usecases/delete-file'

export class DeleteFileController implements Controller {
  constructor(private readonly deleteFileUseCase: IDeleteFileUseCase) {}
  public async handle(req: Request): Promise<HttpResponse> {
    try {
      const { id } = req.params
      await this.deleteFileUseCase.invoke(id)
      return {
        msg: 'File deleted successfully',
        statusCode: HttpStatusCode.Ok,
      }
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      }
    }
  }
}

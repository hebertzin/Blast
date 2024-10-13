import { Request } from 'express'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domains/controller'
import { HttpStatusCode } from '../../../core/application/domains/http-status'
import { IListFileByIdUseCase } from '../../../core/application/domains/usecases/list-file-by-id'

export class ListFileByIdController implements Controller {
  constructor(private readonly listFileByIdUseCase: IListFileByIdUseCase) {}
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

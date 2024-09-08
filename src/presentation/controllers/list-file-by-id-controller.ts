import { Request } from 'express'
import { IListFileByIdUseCase } from '../../application/usecases/list-file-by-id-use-case'
import { HttpStatusCode } from '../../domain/http-status'
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

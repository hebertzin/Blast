import { Request } from 'express'
import { IUploadFileUseCase } from '../../application/usecases/upload-file-use-case'
import { HttpStatusCode } from '../../domain/http-status'
import { Controller, HttpResponse } from '../../domain/controller'

export class UploadController implements Controller {
  constructor(readonly uploadFileUseCase: IUploadFileUseCase) {}
  public handle = async (req: Request): Promise<HttpResponse> => {
    try {
      const file = req.file
      const data = await this.uploadFileUseCase.invoke(file)
      return {
        msg: 'File uploaded',
        statusCode: HttpStatusCode.Created,
        body: data,
      }
    } catch (error) {
      return { msg: error.message, statusCode: error.statusCode }
    }
  }
}

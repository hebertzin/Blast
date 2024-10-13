import { Request } from 'express'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domains/controller'
import { IUploadFileUseCase } from '../../../core/application/domains/usecases/upload-file'
import { HttpStatusCode } from '../../../core/application/domains/http-status'

export class UploadController implements Controller {
  constructor(private readonly uploadFileUseCase: IUploadFileUseCase) {}
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

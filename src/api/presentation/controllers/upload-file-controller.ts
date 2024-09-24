import { Request } from 'express'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domain/controller'
import { IUploadFileUseCase } from '../../../core/application/usecases/upload-file-use-case'
import { HttpStatusCode } from '../../../core/application/domain/http-status'

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

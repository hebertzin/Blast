import { Request } from 'express'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domains/controller'
import { HttpStatusCode } from '../../../core/application/domains/http-status'
import { IUploadFilesUseCase } from '../../../core/application/domains/usecases/upload-files'

export class UploadFilesController implements Controller {
  constructor(private readonly uploadFilesUseCase: IUploadFilesUseCase) {}
  public async handle(req: Request): Promise<HttpResponse> {
    try {
      const files = req?.files as Express.Multer.File[]
      await this.uploadFilesUseCase.invoke(files)
      return { msg: 'Files uploaded', statusCode: HttpStatusCode.Created }
    } catch (error) {
      return { msg: error.message, statusCode: error.statusCode }
    }
  }
}

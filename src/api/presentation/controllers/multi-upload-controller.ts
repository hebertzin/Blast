import { Request } from 'express'
import { IUploadFilesUseCase } from '../../../core/application/usecases/multi-upload-file-use-case'
import {
  Controller,
  HttpResponse,
} from '../../../core/application/domain/controller'
import { HttpStatusCode } from '../../../core/application/domain/http-status'

export class UploadFilesController implements Controller {
  constructor(readonly uploadFilesUseCase: IUploadFilesUseCase) {}
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

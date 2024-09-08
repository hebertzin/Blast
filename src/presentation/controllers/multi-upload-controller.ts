import { Request } from 'express'
import {
  IUploadFilesUseCase,
  UploadFilesUseCase,
} from '../../application/usecases/multi-upload-file-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { Controller, HttpResponse } from '../../domain/controller'

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
export const uploadService = new UploadFilesUseCase(s3, loggerService)
export const uploadFilesControllerHandler = new UploadFilesController(
  uploadService,
)

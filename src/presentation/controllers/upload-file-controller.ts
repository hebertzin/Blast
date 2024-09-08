import { Request } from 'express'
import {
  IUploadFileUseCase,
  UploadFileUseCase,
} from '../../application/usecases/upload-file-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
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

export const uploadFileService = new UploadFileUseCase(
  s3,
  'storage-app',
  loggerService,
)

export const uploadFileControllerHandler = new UploadController(
  uploadFileService,
)

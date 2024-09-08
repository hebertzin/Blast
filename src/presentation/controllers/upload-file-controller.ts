import { Request, Response } from 'express'
import {
  IUploadFileUseCase,
  UploadFileUseCase,
} from '../../application/usecases/upload-file-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'

export class UploadController {
  constructor(readonly uploadFileUseCase: IUploadFileUseCase) {}
  public handle = async (req: Request, res: Response) => {
    try {
      const file = req.file
      const data = await this.uploadFileUseCase.invoke(file)
      return res.status(HttpStatusCode.Created).json(data)
    } catch (error) {
      return res.status(error.code).json({ error })
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

import { Request, Response } from 'express'
import {
  IUploadFilesUseCase,
  UploadFilesUseCase,
} from '../../application/usecases/multi-upload-file-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'

export class UploadFilesController {
  constructor(readonly uploadFilesUseCase: IUploadFilesUseCase) {}
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = req?.files as Express.Multer.File[]
      if (!files || files.length === 0) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: 'No files sent',
        })
      }
      await this.uploadFilesUseCase.invoke(files)
      return res
        .status(HttpStatusCode.Created)
        .json({ message: 'Files uploaded successfully' })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const uploadService = new UploadFilesUseCase(s3, loggerService)

export const uploadFilesControllerHandler = new UploadFilesController(
  uploadService,
)

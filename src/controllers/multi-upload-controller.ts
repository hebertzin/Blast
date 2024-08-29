import { Request, Response } from 'express'
import { UploadFilesService } from '../services/multi-upload-file-service'
import { s3 } from '../aws'
import { HttpStatusCode } from '../utils/http-status'
import { loggerService } from '../config/logger/winston'

export class UploadFilesController {
  private uploadFilesService: UploadFilesService

  constructor(uploadFiles: UploadFilesService) {
    this.uploadFilesService = uploadFiles
  }
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = req?.files as Express.Multer.File[]
      if (!files || files.length === 0) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: 'No files sent',
        })
      }
      await this.uploadFilesService.invoke(files)
      return res
        .status(HttpStatusCode.Created)
        .json({ message: 'Files uploaded successfully' })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const uploadService = new UploadFilesService(s3, loggerService)

export const uploadFilesControllerHandler = new UploadFilesController(
  uploadService,
)

import { Request, Response } from 'express'
import { UploadFileService } from '../services/upload-file-service'
import { s3 } from '../aws'
import { HttpStatusCode } from '../utils/http-status'
import { loggerService } from '../config/logger/winston'

export class UploadController {
  private uploadService: UploadFileService

  constructor(uploadService: UploadFileService) {
    this.uploadService = uploadService
  }

  public handle = async (req: Request, res: Response) => {
    try {
      const file = req.file

      const data = await this.uploadService.invoke(file)

      return res.status(HttpStatusCode.Created).json(data)

    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const uploadFileService = new UploadFileService(
  s3,
  'storage-app',
  loggerService,
)

export const uploadFileControllerHandler = new UploadController(
  uploadFileService,
)

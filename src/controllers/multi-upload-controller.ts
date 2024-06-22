import { Request, Response } from 'express'
import { UploadFilesService } from '../services/multi-upload-file-service'
import { s3 } from '../aws'
import { HttpStatusCode } from '../utils/http-status'

export class UploadFilesController {
  private uploadFilesService: UploadFilesService

  constructor(uploadFiles: UploadFilesService) {
    this.uploadFilesService = uploadFiles
  }
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const files = request?.files as Express.Multer.File[]
      if (!files || files.length === 0) {
        return response.status(HttpStatusCode.BadRequest).json({
          message: 'No files sent',
        })
      }

      await this.uploadFilesService.invoke(files)

      return response
        .status(HttpStatusCode.Created)
        .json({ message: 'Files uploaded successfully' })
    } catch (error) {
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ message: 'An error has occurred' })
    }
  }
}

export const uploadFilesControllerHandler = new UploadFilesController(
  new UploadFilesService(s3),
)

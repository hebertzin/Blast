import { Request, Response } from 'express'
import { UploadFileService } from '../services/add-file'

export class UploadController {
  private uploadService: UploadFileService

  constructor(uploadService: UploadFileService) {
    this.uploadService = uploadService
  }

  public handle = async (request: Request, response: Response) => {
    try {
      const file = request.file

      if (!file) {
        return response
          .status(HttpStatusCode.BadRequest)
          .json({ message: 'No file provided' })
      }

      const data = await this.uploadService.invoke(file)

      return response.status(HttpStatusCode.Created).json(data)
    } catch (error) {
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ message: 'Some error has occurred' })
    }
  }
}

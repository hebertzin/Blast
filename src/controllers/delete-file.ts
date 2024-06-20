import { s3 } from '../aws'
import { DeleteFileService } from '../services/delete-file'
import { Request, Response } from 'express'

export class DeleteFileController {
  private deleteFileService: DeleteFileService
  constructor(deleteService: DeleteFileService) {
    this.deleteFileService = deleteService
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      await this.deleteFileService.invoke(id)

      return response
        .status(HttpStatusCode.Ok)
        .json({ message: 'File deleted successfully' })
    } catch (error) {
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ message: 'An error has occurred' })
    }
  }
}

export const deleteFileControllerHandler = new DeleteFileController(
  new DeleteFileService(s3),
)

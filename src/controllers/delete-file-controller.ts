import { s3 } from '../aws'
import { DeleteFileService } from '../application/usecases/delete-files-service'
import { Request, Response } from 'express'
import { HttpStatusCode } from '../utils/http-status'

export class DeleteFileController {
  private deleteFileService: DeleteFileService

  constructor(deleteService: DeleteFileService) {
    this.deleteFileService = deleteService
  }
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await this.deleteFileService.invoke(id)
      return res
        .status(HttpStatusCode.Ok)
        .json({ message: 'File deleted successfully' })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const deleteFileControllerHandler = new DeleteFileController(
  new DeleteFileService(s3),
)

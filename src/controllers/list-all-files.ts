import { Request, Response } from 'express'
import { ListFilesService } from '../services/list-files'
import { s3 } from '../aws'

export class ListFilesController {
  private listFilesService: ListFilesService
  constructor(listFiles: ListFilesService) {
    this.listFilesService = listFiles
  }
  public async handle(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const files = await this.listFilesService.invoke()

      return response.status(HttpStatusCode.Ok).json({
        files: files,
      })
    } catch (error) {
      return response
        .status(HttpStatusCode.BadRequest)
        .json({ message: 'An error has occurred' })
    }
  }
}

export const listFilesControllerHandler = new ListFilesController(
  new ListFilesService(s3),
)

import { Request, Response } from 'express'
import { ListFilesService } from '../services/list-files'
import { S3Client } from '@aws-sdk/client-s3'

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

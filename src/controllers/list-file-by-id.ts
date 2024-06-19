import { Request, Response } from 'express'
import { ListFileByIdService } from '../services/list-file-by-id'

export class FileController {
  private listFileByIdService: ListFileByIdService
  constructor(listById: ListFileByIdService) {
    this.listFileByIdService = listById
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { key } = request.params

      const fileDetails = await this.listFileByIdService.invoke(key)

      return response.status(HttpStatusCode.Ok).json({
        file: fileDetails,
      })
    } catch (error) {
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ message: 'An error has occurred' })
    }
  }
}

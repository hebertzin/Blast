import { Request, Response } from 'express'
import { ListFileByIdService } from '../services/list-file-by-id'
import { s3 } from '../aws'

export class ListFileByIdController {
  private listFileByIdService: ListFileByIdService
  constructor(listById: ListFileByIdService) {
    this.listFileByIdService = listById
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const fileDetails = await this.listFileByIdService.invoke(id)

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

export const listFileByIdControllerHandler = new ListFileByIdController(
  new ListFileByIdService(s3),
)

import { Request, Response } from 'express'
import { ListFileByIdService } from '../../application/usecases/list-file-by-id-service'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'

export class ListFileByIdController {
  private listFileByIdService: ListFileByIdService

  constructor(listById: ListFileByIdService) {
    this.listFileByIdService = listById
  }
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const fileDetails = await this.listFileByIdService.invoke(id)
      return res.status(HttpStatusCode.Ok).json({
        file: fileDetails,
      })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const listFileByIdService = new ListFileByIdService(
  s3,
  loggerService,
  redis,
)

export const listFileByIdControllerHandler = new ListFileByIdController(
  listFileByIdService,
)

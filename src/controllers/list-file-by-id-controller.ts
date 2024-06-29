import { Request, Response } from 'express'
import { ListFileByIdService } from '../services/list-file-by-id-service'
import { s3 } from '../aws'
import { HttpStatusCode } from '../utils/http-status'
import { loggerService } from '../config/logger/winston'
import { redis } from '../redis'

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

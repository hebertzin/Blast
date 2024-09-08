import { Request, Response } from 'express'
import {
  IListFileByIdUseCase,
  ListFileByIdUseCase,
} from '../../application/usecases/list-file-by-id-use-case'
import { s3 } from '../../infra/aws'
import { HttpStatusCode } from '../../domain/http-status'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'

export class ListFileByIdController {
  constructor(readonly listFileByIdUseCase: IListFileByIdUseCase) {}
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const fileDetails = await this.listFileByIdUseCase.invoke(id)
      return res.status(HttpStatusCode.Ok).json({
        file: fileDetails,
      })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const listFileByIdService = new ListFileByIdUseCase(
  s3,
  loggerService,
  redis,
)

export const listFileByIdControllerHandler = new ListFileByIdController(
  listFileByIdService,
)

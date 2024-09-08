import { s3 } from '../../infra/aws'
import {
  DeleteFileUseCase,
  IDeleteFileUseCase,
} from '../../application/usecases/delete-file-use-case'
import { Request, Response } from 'express'
import { HttpStatusCode } from '../../domain/http-status'

export class DeleteFileController {
  constructor(private readonly deleteFileUseCase: IDeleteFileUseCase) {}
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await this.deleteFileUseCase.invoke(id)
      return res
        .status(HttpStatusCode.Ok)
        .json({ message: 'File deleted successfully' })
    } catch (error) {
      return res.status(error.code).json({ error })
    }
  }
}

export const deleteFileControllerHandler = new DeleteFileController(
  new DeleteFileUseCase(s3),
)

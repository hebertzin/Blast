import {
  DeleteFileUseCase,
  IDeleteFileUseCase,
} from '../../../application/usecases/delete-file-use-case'
import { s3 } from '../../aws'

export const makeDeleteFileUseCase = (): IDeleteFileUseCase => {
  return new DeleteFileUseCase(s3)
}

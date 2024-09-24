import { DeleteFileController } from '../../../../api/presentation/controllers/delete-file-controller'
import { Controller } from '../../../application/domain/controller'
import { makeDeleteFileUseCase } from '../usecases/delete-file'

export const makeDeleteFileController = (): Controller => {
  return new DeleteFileController(makeDeleteFileUseCase())
}

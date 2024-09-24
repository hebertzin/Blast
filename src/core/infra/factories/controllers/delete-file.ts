import { Controller } from '../../../core/application/domain/controller'
import { DeleteFileController } from '../../../presentation/controllers/delete-file-controller'
import { makeDeleteFileUseCase } from '../usecases/delete-file'

export const makeDeleteFileController = (): Controller => {
  return new DeleteFileController(makeDeleteFileUseCase())
}

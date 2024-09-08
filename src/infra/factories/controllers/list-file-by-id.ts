import { Controller } from '../../../domain/controller'
import { ListFileByIdController } from '../../../presentation/controllers/list-file-by-id-controller'
import { makeListFileUseCase } from '../usecases/list-file-by-id'

export const makeListFileController = (): Controller => {
  return new ListFileByIdController(makeListFileUseCase())
}

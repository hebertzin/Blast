import { ListFileByIdController } from '../../../../api/presentation/controllers/list-file-by-id-controller'
import { Controller } from '../../../application/domain/controller'
import { makeListFileUseCase } from '../usecases/list-file-by-id'

export const makeListFileController = (): Controller => {
  return new ListFileByIdController(makeListFileUseCase())
}

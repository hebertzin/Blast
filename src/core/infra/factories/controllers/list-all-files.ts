import { Controller } from '../../../core/application/domain/controller'
import { ListFilesController } from '../../../presentation/controllers/list-all-files-controller'
import { makeListFilesUseCase } from '../usecases/list-all-files'

export const makeListFilesController = (): Controller => {
  return new ListFilesController(makeListFilesUseCase())
}

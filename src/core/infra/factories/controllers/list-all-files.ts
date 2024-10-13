import { ListFilesController } from '../../../../api/presentation/controllers/list-all-files-controller'
import { Controller } from '../../../application/domains/controller'
import { makeListFilesUseCase } from '../usecases/list-all-files'

export const makeListFilesController = (): Controller => {
  return new ListFilesController(makeListFilesUseCase())
}

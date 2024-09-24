import { Controller } from '../../../core/application/domain/controller'
import { UploadFilesController } from '../../../presentation/controllers/multi-upload-controller'
import { makeUploadFilesUseCase } from '../usecases/upload-files'

export const makeUploadFilesController = (): Controller => {
  return new UploadFilesController(makeUploadFilesUseCase())
}

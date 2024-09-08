import { Controller } from '../../../domain/controller'
import { UploadController } from '../../../presentation/controllers/upload-file-controller'
import { makeUploadFileUseCase } from '../usecases/upload-file'

export const makeUploadFileController = (): Controller => {
  return new UploadController(makeUploadFileUseCase())
}

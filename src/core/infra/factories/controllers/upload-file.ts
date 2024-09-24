import { UploadController } from '../../../../api/presentation/controllers/upload-file-controller'
import { Controller } from '../../../application/domain/controller'
import { makeUploadFileUseCase } from '../usecases/upload-file'

export const makeUploadFileController = (): Controller => {
  return new UploadController(makeUploadFileUseCase())
}

import { UploadController } from '../../../../api/presentation/controllers/upload-file-controller'
import { Controller } from '../../../application/domains/controller'
import { makeUploadFileUseCase } from '../usecases/upload-file'

export const makeUploadFileController = (): Controller => {
  return new UploadController(makeUploadFileUseCase())
}

import {
  IUploadFileUseCase,
  UploadFileUseCase,
} from '../../../core/application/usecases/upload-file-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logging/winston'

export const makeUploadFileUseCase = (): IUploadFileUseCase => {
  return new UploadFileUseCase(s3, 'bucket-name', loggerService)
}

import {
  IUploadFileUseCase,
  UploadFileUseCase,
} from '../../../application/usecases/upload-file-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logger/winston'

export const makeUploadFileUseCase = (): IUploadFileUseCase => {
  return new UploadFileUseCase(s3, 'bucket-name', loggerService)
}

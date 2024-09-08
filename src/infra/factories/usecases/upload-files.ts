import {
  IUploadFilesUseCase,
  UploadFilesUseCase,
} from '../../../application/usecases/multi-upload-file-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logger/winston'

export const makeUploadFilesUseCase = (): IUploadFilesUseCase => {
  return new UploadFilesUseCase(s3, loggerService)
}

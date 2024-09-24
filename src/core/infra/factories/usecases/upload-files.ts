import {
  IUploadFilesUseCase,
  UploadFilesUseCase,
} from '../../../core/application/usecases/multi-upload-file-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logging/winston'

export const makeUploadFilesUseCase = (): IUploadFilesUseCase => {
  return new UploadFilesUseCase(s3, loggerService)
}

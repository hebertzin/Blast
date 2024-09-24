import {
  IUploadFilesUseCase,
  UploadFilesUseCase,
} from '../../../application/usecases/multi-upload-file-use-case'
import { s3 } from '../../aws'
import { logging } from '../../config/logging/winston'

export const makeUploadFilesUseCase = (): IUploadFilesUseCase => {
  return new UploadFilesUseCase(s3, logging)
}

import {
  IUploadFileUseCase,
  UploadFileUseCase,
} from '../../../application/usecases/upload-file-use-case'
import { s3 } from '../../aws'
import { logging } from '../../config/logging/winston'

export const makeUploadFileUseCase = (): IUploadFileUseCase => {
  return new UploadFileUseCase(s3, 'bucket-name', logging)
}

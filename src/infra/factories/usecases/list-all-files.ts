import {
  IListFilesUseCase,
  ListFilesUseCase,
} from '../../../application/usecases/list-files-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logger/winston'
import { redis } from '../../redis'

export const makeListFilesUseCase = (): IListFilesUseCase => {
  return new ListFilesUseCase(s3, loggerService, redis)
}

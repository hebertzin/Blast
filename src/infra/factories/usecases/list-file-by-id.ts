import {
  ListFileByIdUseCase,
  IListFileByIdUseCase,
} from '../../../application/usecases/list-file-by-id-use-case'
import { s3 } from '../../aws'
import { loggerService } from '../../config/logger/winston'
import { redis } from '../../redis'

export const makeListFileUseCase = (): IListFileByIdUseCase => {
  return new ListFileByIdUseCase(s3, loggerService, redis)
}

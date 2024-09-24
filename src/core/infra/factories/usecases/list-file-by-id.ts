import {
  IListFileByIdUseCase,
  ListFileByIdUseCase,
} from '../../../application/usecases/list-file-by-id-use-case'
import { s3 } from '../../aws'
import { logging } from '../../config/logging/winston'
import { RedisImplementation } from '../../redis/redis'

export const makeListFileUseCase = (): IListFileByIdUseCase => {
  return new ListFileByIdUseCase(s3, logging, new RedisImplementation())
}

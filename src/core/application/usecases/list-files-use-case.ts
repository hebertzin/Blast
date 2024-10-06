import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { AppError } from '../errors/app-error'
import { HttpStatusCode } from '../domain/http-status'
import { Redis } from '../domain/redis'
import { IListFilesUseCase } from '../domain/usecases/list-all-files'

export class ListFilesUseCase implements IListFilesUseCase {
  constructor(
    readonly s3: S3Client,
    readonly logging: Logger,
    readonly redisService: Redis,
  ) {}
  public async invoke(): Promise<_Object[]> {
    const params = {
      Bucket: 'storage-app',
    }
    try {
      const cacheData = await this.redisService.get('data')
      if (cacheData) {
        this.logging.info('Returning data from cache...')
        return JSON.parse(cacheData)
      }
      const data = await this.s3.send(new ListObjectsV2Command(params))
      this.redisService.set('data', JSON.stringify(data), 3000)
      return data.Contents
    } catch (error) {
      throw new AppError(
        'Some error has been ocurred',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

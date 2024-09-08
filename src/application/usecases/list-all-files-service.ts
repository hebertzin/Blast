import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3'
import { Redis } from 'ioredis'
import { Logger } from 'winston'
import { AppError } from '../utils/errors/app-error'
import { HttpStatusCode } from '../utils/http-status'

export class ListFilesService {
  private s3: S3Client
  private redisService: Redis
  private logger: Logger

  constructor(s3: S3Client, logger: Logger, redisService: Redis) {
    this.s3 = s3
    this.redisService = redisService
    this.logger = logger
  }
  public async invoke(): Promise<_Object[]> {
    const params = {
      Bucket: 'storage-app',
    }
    try {
      const cacheData = await this.redisService.get('data')
      if (cacheData) {
        this.logger.info('Returning data from cache...')
        return JSON.parse(cacheData)
      }
      const data = await this.s3.send(new ListObjectsV2Command(params))

      await this.redisService.set('data', JSON.stringify(data), 'EX', 3000)
      return data.Contents
    } catch (error) {
      throw new AppError(
        'Some error has been ocurred',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

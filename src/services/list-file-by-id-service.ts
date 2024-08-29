import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Redis } from 'ioredis'
import { Logger } from 'winston'
import { AppError, FileNotFound } from '../utils/errors/app-error'
import { HttpStatusCode } from '../utils/http-status'

type ReturnTypeListFileById = {
  key: string
  size: number
  lastModified: Date
  contentType: string
}

export class ListFileByIdService {
  private s3: S3Client
  private logger: Logger
  private redisService: Redis

  constructor(s3: S3Client, logger: Logger, redisService: Redis) {
    this.s3 = s3
    this.logger = logger
    this.redisService = redisService
  }
  public async invoke(file_id: string): Promise<ReturnTypeListFileById> {
    const cacheData = await this.redisService.get(file_id)
    if (cacheData) {
      this.logger.info('Returning file in cache...')
      return JSON.parse(cacheData)
    }
    if (!file_id || file_id.trim() == '') {
      this.logger.warn('Provide a file file id...')
      throw new FileNotFound(
        'Please provide a file id',
        HttpStatusCode.NotFound,
      )
    }
    const params = {
      Bucket: 'storage-app',
      Key: file_id,
    }
    try {
      const data = await this.s3.send(new HeadObjectCommand(params))
      const result: ReturnTypeListFileById = {
        key: file_id,
        size: data.ContentLength,
        lastModified: data.LastModified,
        contentType: data.ContentType,
      }

      await this.redisService.set(file_id, JSON.stringify(result), 'EX', 600)
      return result
    } catch (error) {
      throw new AppError(
        'An error occurred while trying to retrieve a file',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

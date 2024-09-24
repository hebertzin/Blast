import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { AppError, FileNotFound } from '../errors/app-error'
import { HttpStatusCode } from '../domain/http-status'
import { File } from '../domain/file'
import { Redis } from '../domain/redis'

export interface IListFileByIdUseCase {
  invoke(file_id: string): Promise<File>
}
export class ListFileByIdUseCase implements IListFileByIdUseCase {
  constructor(
    readonly s3: S3Client,
    readonly logging: Logger,
    readonly redisService: Redis,
  ) {}
  public async invoke(file_id: string): Promise<File> {
    const cacheData = await this.redisService.get(file_id)
    if (cacheData) {
      this.logging.info('Returning file in cache...')
      return JSON.parse(cacheData)
    }
    if (!file_id || file_id.trim() == '') {
      this.logging.warn('Provide a file file id...')
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
      const result: File = {
        key: file_id,
        size: data.ContentLength,
        lastModified: data.LastModified,
        contentType: data.ContentType,
      }
      this.redisService.set(file_id, JSON.stringify(result), 600)
      return result
    } catch (error) {
      throw new AppError(
        'An error occurred while trying to retrieve a file',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

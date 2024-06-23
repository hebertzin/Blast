import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Logger } from 'winston'

type ReturnTypeListFileById = {
  key: string
  size: number
  lastModified: Date
  contentType: string
}

export class ListFileByIdService {
  private s3: S3Client
  private logger: Logger

  constructor(s3: S3Client, logger: Logger) {
    this.s3 = s3
    this.logger = logger
  }

  public async invoke(file_id: string): Promise<ReturnTypeListFileById> {
    if (!file_id || file_id.trim() == '') {
      this.logger.warn('Provide a file file id...')
      throw new Error('Please provide a file id')
    }
    const params = {
      Bucket: 'storage-app',
      Key: file_id,
    }

    try {
      const data = await this.s3.send(new HeadObjectCommand(params))
      return {
        key: file_id,
        size: data.ContentLength,
        lastModified: data.LastModified,
        contentType: data.ContentType,
      }
    } catch (error) {
      throw new Error('Some error while get a file...')
    }
  }
}

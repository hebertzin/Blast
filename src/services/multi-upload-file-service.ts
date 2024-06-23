import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Logger } from 'winston'

export class UploadFilesService {
  private s3: S3Client
  private logger: Logger

  constructor(s3: S3Client, logger: Logger) {
    this.s3 = s3
    this.logger = logger
  }

  public async invoke(files: Express.Multer.File[]): Promise<void> {
    if (!files || files.length < 2) {
      throw new Error('Must have more than one file')
    }

    const uploadPromises = files.map(async (file: Express.Multer.File) => {
      if (!file || !file.buffer || !file.originalname) {
        this.logger.warn('Invalid file...')
        throw new Error(`Invalid file: ${file ? file.originalname : 'unknown'}`)
      }

      const fileContent = file.buffer

      const params = {
        Bucket: 'storage-app',
        Key: file.originalname,
        Body: fileContent,
      }

      try {
        await this.s3.send(new PutObjectCommand(params))
      } catch (error) {
        this.logger.error('Error upload files...')
        throw new Error('An error trying upload files...')
      }
    })

    await Promise.all(uploadPromises)
  }
}

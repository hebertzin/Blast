import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { AppError, FileLengthError } from '../utils/errors/app-error'
import { HttpStatusCode } from '../utils/http-status'

export class UploadFilesService {
  private s3: S3Client
  private logger: Logger

  constructor(s3: S3Client, logger: Logger) {
    this.s3 = s3
    this.logger = logger
  }

  public async invoke(files: Express.Multer.File[]): Promise<void> {
    if (!files || files.length < 2) {
      throw new FileLengthError(
        'Must have more than one file',
        HttpStatusCode.BadRequest,
      )
    }

    const FilesToUpload = files.map(async (file: Express.Multer.File) => {
      if (!file || !file.buffer || !file.originalname) {
        this.logger.warn('Invalid file...')
        throw new Error(`Invalid file: ${file ? file.originalname : 'unknown'}`)
      }

      const params = {
        Bucket: 'storage-app',
        Key: file.originalname,
        Body: file.buffer,
      }

      try {
        await this.s3.send(new PutObjectCommand(params))
      } catch (error) {
        this.logger.error('Error upload files...')
        throw new AppError(
          'An error trying upload files...',
          HttpStatusCode.InternalServerError,
        )
      }
    })

    await Promise.all(FilesToUpload)
  }
}

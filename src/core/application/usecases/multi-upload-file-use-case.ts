import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { FileLengthError, AppError } from '../errors/app-error'
import { HttpStatusCode } from '../domains/http-status'
import { IUploadFilesUseCase } from '../domains/usecases/upload-files'

export class UploadFilesUseCase implements IUploadFilesUseCase {
  constructor(
    readonly s3: S3Client,
    readonly logging: Logger,
  ) {}
  public async invoke(files: Express.Multer.File[]): Promise<void> {
    if (!files || files.length < 2) {
      throw new FileLengthError(
        'Must have more than one file',
        HttpStatusCode.BadRequest,
      )
    }
    const FilesToUpload = files.map(async (file: Express.Multer.File) => {
      if (!file || !file.buffer || !file.originalname) {
        this.logging.warn('Invalid file...')
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
        this.logging.error('Error upload files...')
        throw new AppError(
          'An error trying upload files...',
          HttpStatusCode.InternalServerError,
        )
      }
    })
    await Promise.all(FilesToUpload)
  }
}

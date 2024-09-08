import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Logger } from 'winston'
import { AppError, FileNotFound } from '../errors/app-error'
import { HttpStatusCode } from '../../domain/http-status'

export interface IUploadFileUseCase {
  invoke(file: Express.Multer.File): Promise<PutObjectCommandOutput>
}

export class UploadFileUseCase implements IUploadFileUseCase {
  constructor(
    readonly s3Client: S3Client,
    readonly bucketName: string,
    readonly logger: Logger,
  ) {}
  public async invoke(
    file: Express.Multer.File,
  ): Promise<PutObjectCommandOutput> {
    if (!file) {
      throw new FileNotFound('Provide a file', HttpStatusCode.NotFound)
    }
    const params = {
      Bucket: this.bucketName,
      Key: file.originalname,
      Body: file.buffer,
    }
    try {
      const command = new PutObjectCommand(params)
      return await this.s3Client.send(command)
    } catch (error) {
      this.logger.error('Error uploading file:', error)
      throw new AppError(
        'An error occurred while uploading the file',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { AppError, FileNotFound } from '../errors/app-error'
import { HttpStatusCode } from '../domain/http-status'

export interface IDeleteFileUseCase {
  invoke(file_id: string): Promise<void>
}

export class DeleteFileUseCase implements IDeleteFileUseCase {
  constructor(readonly s3: S3Client) {}
  public async invoke(file_id: string): Promise<void> {
    if (!file_id || file_id.trim() == '') {
      throw new FileNotFound('Provide a file id', HttpStatusCode.BadRequest)
    }
    const params = {
      Bucket: 'storage-app',
      Key: file_id,
    }
    try {
      await this.s3.send(new DeleteObjectCommand(params))
    } catch (error) {
      throw new AppError(
        'Some error has been ocurred',
        HttpStatusCode.InternalServerError,
      )
    }
  }
}

import { PutObjectCommandOutput } from '@aws-sdk/client-s3'

export interface IUploadFileUseCase {
  invoke(file: Express.Multer.File): Promise<PutObjectCommandOutput>
}

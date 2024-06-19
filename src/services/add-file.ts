import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export class UploadFileService {
  private s3: S3Client
  private bucketName: string

  constructor(s3Client: S3Client, bucketName: string) {
    this.s3 = s3Client
    this.bucketName = bucketName
  }

  public async invoke(file: Express.Multer.File) {
    const fileName = file.originalname

    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
    }

    const command = new PutObjectCommand(params)
    return await this.s3.send(command)
  }
}

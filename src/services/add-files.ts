import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export class UploadFilesService {
  private s3: S3Client

  constructor(s3: S3Client) {
    this.s3 = s3
  }

  public async invoke(files: Express.Multer.File[]): Promise<void> {
    const uploadPromises = files.map(async (file: Express.Multer.File) => {
      const fileContent = file.buffer

      const params = {
        Bucket: 'storage-app',
        Key: file.originalname,
        Body: fileContent,
      }

      await this.s3.send(new PutObjectCommand(params))
    })

    await Promise.all(uploadPromises)
  }
}

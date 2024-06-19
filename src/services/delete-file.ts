import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class DeleteFileService {
  private s3: S3Client

  constructor(s3: S3Client) {
    this.s3 = s3
  }

  public async invoke(key: string): Promise<void> {
    const params = {
      Bucket: 'storage-app',
      Key: key,
    }

    await this.s3.send(new DeleteObjectCommand(params))
  }
}

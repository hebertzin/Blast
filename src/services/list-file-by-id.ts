import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'

export class ListFileByIdService {
  private s3: S3Client

  constructor(s3: S3Client) {
    this.s3 = s3
  }

  public async invoke(key: string): Promise<any> {
    const params = {
      Bucket: 'storage-app',
      Key: key,
    }

    const data = await this.s3.send(new HeadObjectCommand(params))

    return {
      key: key,
      size: data.ContentLength,
      lastModified: data.LastModified,
      contentType: data.ContentType,
    }
  }
}

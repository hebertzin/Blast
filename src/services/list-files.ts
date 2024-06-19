import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export class ListFilesService {
  private s3: S3Client

  constructor(s3: S3Client) {
    this.s3 = s3
  }

  public async invoke(): Promise<any> {
    const params = {
      Bucket: 'storage-app',
    }

    const data = await this.s3.send(new ListObjectsV2Command(params))
    return data.Contents
  }
}

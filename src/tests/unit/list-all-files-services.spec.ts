import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { ListFilesService } from '../../application/usecases/list-all-files-service'
import { env } from '../../config/env'
import { loggerService } from '../../config/logger/winston'
import { redis } from '../../redis'
describe('ListFilesService', () => {
  let s3Client: S3Client
  let listFilesService: ListFilesService

  beforeAll(() => {
    s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_KEY,
      },
    })
    listFilesService = new ListFilesService(s3Client, loggerService, redis)
  })

  it('should list files from S3 bucket', async () => {
    const result = await listFilesService.invoke()
    expect(result).toBeDefined()
  })

  afterAll(async () => {
    s3Client.destroy()
  })
})

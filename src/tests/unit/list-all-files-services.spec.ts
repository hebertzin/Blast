import { S3Client } from '@aws-sdk/client-s3'
import { ListFilesService } from '../../application/usecases/list-files-use-case'
import { env } from '../../infra/config/env'
import { loggerService } from '../../infra/config/logger/winston'
import { redis } from '../../infra/redis'
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

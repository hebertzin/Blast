import { S3Client } from '@aws-sdk/client-s3'
import { env } from '../../infra/config/env'
import { loggerService } from '../../infra/config/logger/winston'
import { ListFilesUseCase } from '../../application/usecases/list-files-use-case'
import { RedisImplementation } from '../../infra/redis/redis'

describe('ListFilesService', () => {
  let s3Client: S3Client
  let listFilesService: ListFilesUseCase

  beforeAll(() => {
    s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_KEY,
      },
    })
    listFilesService = new ListFilesUseCase(
      s3Client,
      loggerService,
      new RedisImplementation(),
    )
  })

  it('should list files from S3 bucket', async () => {
    const result = await listFilesService.invoke()
    expect(result).toBeDefined()
  })

  afterAll(async () => {
    s3Client.destroy()
  })
})

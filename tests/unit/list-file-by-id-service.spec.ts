import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { ListFileByIdUseCase } from '../../application/usecases/list-file-by-id-use-case'
import { env } from '../../infra/config/env'
import { loggerService } from '../../infra/config/logger/winston'
import { RedisImplementation } from '../../infra/redis/redis'

describe('ListFileByIdService', () => {
  let s3Client: S3Client
  let listFileByIdService: ListFileByIdUseCase

  beforeAll(() => {
    s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_KEY,
      },
    })

    listFileByIdService = new ListFileByIdUseCase(
      s3Client,
      loggerService,
      new RedisImplementation(),
    )
  })

  it('should list file from S3 bucket', async () => {
    const result = await listFileByIdService.invoke('profile.jpeg')
    expect(result).not.toBeNull()
    expect(result).toBeDefined()
    expect(result.key).toBe('profile.jpeg')
  })

  it('Should return a error if file id is not provide', async () => {
    await expect(listFileByIdService.invoke('')).rejects.toThrow(
      'Please provide a file id',
    )
  })

  afterAll(async () => {
    s3Client.destroy()
  })
})

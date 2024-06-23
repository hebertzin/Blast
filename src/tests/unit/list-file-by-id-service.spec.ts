import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { ListFileByIdService } from '../../services/list-file-by-id-service'
import { env } from '../../config/env'
import { loggerService } from '../../config/logger/winston'

describe('ListFileByIdService', () => {
  let s3Client: S3Client
  let listFileByIdService: ListFileByIdService

  beforeAll(() => {
    s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_KEY,
      },
    })

    listFileByIdService = new ListFileByIdService(s3Client, loggerService)

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

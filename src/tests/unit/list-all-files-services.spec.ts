import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { ListFilesService } from '../../services/list-all-files-service'
import { env } from '../../config/env'
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
    listFilesService = new ListFilesService(s3Client)
  })

  it('should list files from S3 bucket', async () => {
    const result = await listFilesService.invoke()
    expect(result).toBeDefined()
    result.map((file) => {
      expect(file).toHaveProperty('Key')
      expect(file).toHaveProperty('LastModified')
      expect(file).toHaveProperty('ETag')
      expect(file).toHaveProperty('Size')
      expect(file).toHaveProperty('StorageClass')

      expect(typeof file.Key).toBe('string')
      expect(typeof file.ETag).toBe('string')
      expect(typeof file.Size).toBe('number')
      expect(typeof file.StorageClass).toBe('string')
    })
  })

  afterAll(async () => {
    s3Client.destroy()
  })
})

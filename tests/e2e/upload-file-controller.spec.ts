import request from 'supertest'
import { ExpressApp as app } from '../../app'
import { HttpStatusCode } from '../../utils/http-status'

describe('/api/v1/files/upload', () => {
  it('Should return error if no file provide', async () => {
    const response = await request(new app().getApp()).post(
      '/api/v1/files/upload',
    )
    expect(response.status).toBe(HttpStatusCode.BadRequest)
    expect(response.body.error).toBe('No file provided')
  })

  it('Must return error if file is not allowed', async () => {
    const response = await request(new app().getApp())
      .post('/api/v1/files/upload')
      .attach('file', Buffer.from('test content'), {
        filename: 'testfile.txt',
        contentType: 'text/plain',
      })

    expect(response.status).toBe(HttpStatusCode.BadRequest)
    expect(response.body.error).toBe('File type not allowed')
  })
})

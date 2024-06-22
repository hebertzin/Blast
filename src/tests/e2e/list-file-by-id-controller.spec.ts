import request from 'supertest'
import { HttpStatusCode } from '../../utils/http-status'
import { ExpressApp as app } from '../../app'

describe('/api/v1/files/:id', () => {
  it('Must return file correctly with all properties', async () => {
    const fileId = 'profile.jpeg'

    const response = await request(new app().getApp())
      .get(`/api/v1/files/${fileId}`)
      .expect('Content-Type', /json/)

    const file = response.body.file

    expect(response.status).toBe(HttpStatusCode.Ok)

    expect(file).toBeDefined()
    expect(file.key).toBe(fileId)

    expect(typeof file.key).toBe('string')
    expect(typeof file.lastModified).toBe('string')
    expect(typeof file.contentType).toBe('string')

    expect(file).toHaveProperty('key')
    expect(file).toHaveProperty('lastModified')
    expect(file).toHaveProperty('contentType')
  })
})

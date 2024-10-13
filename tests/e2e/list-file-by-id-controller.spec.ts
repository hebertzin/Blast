import request from 'supertest'
import { HttpStatusCode } from '../../src/core/application/domains/http-status'
import { ExpressApp as app } from '../../src/api/presentation/app'

describe('/api/v1/files/:id', () => {
  it('Must return file correctly with all properties', async () => {
    const fileId = 'profile.jpeg'

    const response = await request(new app().getApp())
      .get(`/api/v1/files/${fileId}`)
      .expect('Content-Type', /json/)

    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toBe(HttpStatusCode.Ok)
    const file = response.body.file

    expect(file).toBeDefined()
    expect(file).toHaveProperty('key')
    expect(file).toHaveProperty('lastModified')
    expect(file).toHaveProperty('contentType')
    expect(file.key).toBe(fileId)

    expect(typeof file.key).toBe('string')
    expect(typeof file.lastModified).toBe('string')
    expect(typeof file.contentType).toBe('string')
  })
})

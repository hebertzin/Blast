import request from 'supertest'
import { HttpStatusCode } from '../../utils/http-status'
import { ExpressApp as app } from '../../app'

describe('/api/v1/files/:id', () => {
  it('Must return file', async () => {
    const fileId = 'profile.jpeg'
    const response = await request(new app().getApp()).get(
      `/api/v1/files/${fileId}`,
    )

    expect(response.status).toEqual(HttpStatusCode.Ok)
    expect(response.body.file).toBeDefined()
    expect(response.body.file.key).toEqual(fileId)
  })
})

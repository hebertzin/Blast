import request from 'supertest'
import { HttpStatusCode } from '../../utils/http-status'
import { ExpressApp as app } from '../../app'

describe('/api/v1/files', () => {
  it('Deve retornar status 200 e os dados corretos', async () => {
    const response = await request(new app().getApp()).get('/api/v1/files')

    expect(response.status).toEqual(HttpStatusCode.Ok)
    expect(response.body.files).toBeDefined()
  })
})

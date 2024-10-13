import request from 'supertest'
import { HttpStatusCode } from '../../src/core/application/domains/http-status'
import { ExpressApp as app } from '../../src/api/presentation/app'

describe('/health', () => {
  it('Must return status 200', async () => {
    const response = await request(new app().getApp()).get('/health')

    expect(response.status).toBe(HttpStatusCode.Ok)
    expect(response.body.status).toBe('up')
    expect(response.body.message).toBe('Aplication is alive!')
    expect(response.body.path).toBe('/health')
    expect(response.body.timestamp).toBeDefined()
  })
})

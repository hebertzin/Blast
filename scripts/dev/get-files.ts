import { check, sleep } from 'k6'
import http from 'k6/http'

export let options = {
  vus: 800,
  iterations: 20000,
}

export default function () {
  let res = http.get('http://localhost:4000/api/v1/files')

  check(res, { 'request successfully': (r) => r.status === 200 })

  sleep(0.3)
}

/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 18:59.
 **************************************************/
const path = require('path')
const server = require('../src/server')
const supertest = require('supertest')

const port = 3000
const mock = path.join(__dirname, 'mock')

let app
let request
let service

beforeAll(async () => {
  app = await server(mock, port)
  service = app.listen()
  request = supertest(service)
})

afterEach(async () => {
  service && service.close()
})

test('/', async (done) => {
  request
    .get('/')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe('Not Found')
      done()
    })
})

test('/aaa/a.text', async (done) => {
  request
    .get('/aaa/a.text')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe('TEST DEMO\n')
      done()
    })
})

test('/aaa/xxx/yyy/dcx', async (done) => {
  request
    .get('/aaa/xxx/yyy/dcx')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        'items|40': [
          {
            'id|+100': 9999,
            'components': [
              {'type|1': ['text', 'textarea']}
            ]
          }
        ]
      }))
      done()
    })
})

test('/aaa/xxx/yyy/zzz', async (done) => {
  request
    .get('/aaa/xxx/yyy/zzz')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        'name|20': [
          {
            'id|+1': 1000000,
            'name|1': [1, 1, 2, 3, 4, 5, 6, 7, 8, 88, 8888, 88883234, 0]
          }
        ]

      }))
      done()
    })
})

test('/bbb/xxx/yyy', async (done) => {
  request
    .get('/bbb/xxx/yyy')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        'dddd': {
          'bb': 99
        }
      }))
      done()
    })
})

test('/bbb/xxx/yyy.json', async (done) => {
  request
    .get('/bbb/xxx/yyy.json')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        'dddd': {
          'bb': 99
        }
      }))
      done()
    })
})

test('/ddd/:xxx/zzz', async (done) => {
  request
    .get('/ddd/YYYY/zzz?start=999&limit=17')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        uuuuu: 999, xxx: 'YYYY',
      }))
      done()
    })
})

test('/ddd/:xxx/sss', async (done) => {
  request
    .get('/ddd/YYYY/sss?start=999&limit=17')
    .expect(200)
    .end((err, res) => {
      expect(res.text).toBe(JSON.stringify({
        uuuuu: 'sss', sss: 'YYYY',
      }))
      done()
    })
})


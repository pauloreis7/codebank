import http from 'http'

const options = {
  timeout: 2000,
  host: 'localhost',
  port: 3333,
  path: '/products'
}

const request = http.request(options, res => {
  console.info('STATUS: ' + res.statusCode)
  process.exitCode = res.statusCode === 200 ? 0 : 1
  process.exit()
})

request.on('error', function (err) {
  console.error('ERROR', err)
  process.exit(1)
})

request.end()

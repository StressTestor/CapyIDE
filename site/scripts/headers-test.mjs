import http from 'node:http'

const HOST = process.env.HEADERS_TEST_HOST || '127.0.0.1'
const PORT = Number(process.env.HEADERS_TEST_PORT || 3000)
const PATHS = ['/', '/features', '/pricing', '/security']

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: HOST, port: PORT, path, method: 'GET' }, res => {
      resolve(res)
    })
    req.on('error', reject)
    req.end()
  })
}

;(async () => {
  let failed = false
  for (const p of PATHS) {
    const res = await get(p)
    const headers = res.headers
    const must = [
      'content-security-policy',
      'referrer-policy',
      'x-content-type-options',
      'cross-origin-opener-policy',
      'cross-origin-embedder-policy',
      'cross-origin-resource-policy',
      'permissions-policy',
    ]
    for (const k of must) {
      if (!headers[k]) {
        console.error(`Missing header ${k} on ${p}`)
        failed = true
      }
    }
  }
  if (failed) {
    process.exit(1)
  } else {
    console.log('Security headers present on all tested paths')
  }
})().catch(err => {
  console.error(err)
  process.exit(1)
})


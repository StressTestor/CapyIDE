import { test, expect } from '@playwright/test'

const CRITICAL_PATHS = [
  '/',
  '/features',
  '/pricing',
  '/changelog',
  '/security',
  '/privacy',
  '/terms',
  '/contact',
  '/partners',
]

test.describe('security headers', () => {
  for (const path of CRITICAL_PATHS) {
    test(`headers present on ${path}`, async ({ request }) => {
      const res = await request.get(path)
      expect(res.status()).toBeLessThan(400)
      const headers = res.headers()
      expect(headers['content-security-policy']).toBeTruthy()
      expect(headers['referrer-policy']).toBe('no-referrer')
      expect(headers['x-content-type-options']).toBe('nosniff')
      expect(headers['cross-origin-opener-policy']).toBe('same-origin')
      expect(headers['cross-origin-embedder-policy']).toBe('require-corp')
      expect(headers['cross-origin-resource-policy']).toBe('same-site')
      expect(headers['permissions-policy']).toBeTruthy()
    })
  }
})

test('no inline scripts without nonce', async ({ page }) => {
  const res = await page.goto('/')
  expect(res?.ok()).toBeTruthy()
  const inlineWithoutNonce = await page.$$eval('script:not([src])', nodes =>
    nodes.filter(n => !n.getAttribute('nonce')).length,
  )
  expect(inlineWithoutNonce).toBe(0)
})


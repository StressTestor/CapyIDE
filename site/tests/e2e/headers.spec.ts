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

  const selector = [
    // inline classic scripts (no type or JS types)
    'script:not([src]):not([nonce]):not([type])',
    'script:not([src]):not([nonce])[type="text/javascript" i]',
    'script:not([src]):not([nonce])[type="application/javascript" i]',
    // inline module scripts
    'script:not([src]):not([nonce])[type="module"]',
  ].join(', ')

  const inlineWithoutNonce = await page.$$eval(selector, nodes =>
    nodes.filter(n => {
      const text = (n.textContent || '').trim()
      // Ignore known Next.js inert/bootstrap inline snippets that won't execute due to CSP
      const allow =
        /^requestAnimationFrame\(/.test(text) ||
        /^\$RB=\[\]/.test(text) ||
        /^\$R[A-Z]?\(/.test(text) ||
        /^\(self\.__next_f=/.test(text) ||
        /^self\.__next_f\.push\(/.test(text) ||
        /document\.querySelectorAll\('body link\[rel="icon"/.test(text)
      return !allow
    }).length,
  )

  if (inlineWithoutNonce) {
    const offenders = await page.$$eval(selector, nodes =>
      nodes
        .filter(n => {
          const text = (n.textContent || '').trim()
          const allow =
            /^requestAnimationFrame\(/.test(text) ||
            /^\$RB=\[\]/.test(text) ||
            /^\$R[A-Z]?\(/.test(text) ||
            /^\(self\.__next_f=/.test(text) ||
            /^self\.__next_f\.push\(/.test(text) ||
            /document\.querySelectorAll\('body link\[rel="icon"/.test(text)
          return !allow
        })
        .slice(0, 3)
        .map(n => n.outerHTML.slice(0, 200)),
    )
    console.log('INLINE EXECUTABLE SCRIPTS (first 3):', offenders)
  }

  expect(inlineWithoutNonce).toBe(0)
})


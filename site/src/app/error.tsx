'use client'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('GlobalError:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <main className="mx-auto max-w-2xl p-6">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 opacity-80">We logged the error. Try again.</p>
          <button className="mt-4 border px-3 py-1 rounded" onClick={() => reset()}>
            Retry
          </button>
        </main>
      </body>
    </html>
  )
}



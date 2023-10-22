'use client'

import { useSearchParams } from 'next/navigation'

export const Messages = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p className="mt-2 p-4 text-red-600 text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-2 p-4 text-green-600 text-center">
          {message}
        </p>
      )}
    </>
  )
}

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  const session = await supabase.auth.getSession()
  // console.log('session', session)

  // 認証が必要なページの場合は、ログインしていない場合はログインページにリダイレクトする
  if (!session.data.session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico|login|api|auth).*)',
}

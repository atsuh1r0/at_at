import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest } from 'next/server'

const supabase = createClientComponentClient()

export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from('users')
    .select(
      `
    id,
    auth_id,
    name,
    icon_path,
    posses(id, posse),
    generations(id, generation)
  `,
    )
    .is('deleted_at', null)

  return new Response(JSON.stringify({ data, error }))
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // 画像は一旦保留
  const { data, error } = await supabase
    .from('users')
    .insert({
      name: body.name,
      auth_id: body.authId,
      posse_id: body.posseId,
      icon_path: body.iconPath,
      generation_id: body.generationId,
    })
    .select()

  return new Response(JSON.stringify({ data, error }))
}

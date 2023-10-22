import { NextResponse } from 'next/server';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function GET(request: Request, {params}: {params: {uuid: string}}) {
  const uuid = params.uuid;

  const { data, error } = await supabase
  .from('users')
  .select(`
    id,
    auth_id,
    name,
    icon_path,
    posses(id, posse),
    generations(id, generation)
  `)
  .eq('auth_id', uuid)
  .is('deleted_at', null);

  return new Response(JSON.stringify({ data: data, error: error}))
}

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server"

const supabase = createClientComponentClient();


export async function GET(request: NextRequest) {
  const { data, error } = await supabase
  .from('working_statuses')
  .select(`
    id,
    status
  `)
  .is('deleted_at', null);

  return new Response(JSON.stringify({ data: data, error: error}))
}

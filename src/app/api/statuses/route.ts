import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server"

const supabase = createClientComponentClient();


export async function POST(request:NextRequest) {
  const body =await request.json()

  const { data, error } = await supabase
  .from('statuses')
  .insert({ user_id: 1, place_id: 2, working_status_id: 3, date: '2023-10-21', is_entered: true, scheduled_time_to_leave: '10:55:11', comment: 'test' })
  .select()

  return new Response(JSON.stringify({ data: data, error: error}))
}

export async function PUT(request:NextRequest) {
  const body =await request.json()

  const { data, error } = await supabase
  .from('statuses')
  .update({ user_id: 1, place_id: 2, working_status_id: 3, date: '2023-10-21', is_entered: true, scheduled_time_to_leave: '13:55:11', comment: 'update test' })
  .eq('user_id', 1)
  .eq('date', '2023-10-21')
  .select()

  return new Response(JSON.stringify({ data: data, error: error}))
}

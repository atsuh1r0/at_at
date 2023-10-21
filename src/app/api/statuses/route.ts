import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server"

const supabase = createClientComponentClient();


export async function POST(request:NextRequest) {
  const body =await request.json()

  const { data, error } = await supabase
  .from('statuses')
  .insert({
    user_id: body.userId,
    place_id: body.placeId,
    working_status_id: body.workingStatusId,
    date: body.date,
    is_entered: true,
    scheduled_time_to_leave: body.scheduledTimeToLeave,
    comment: body.comment
  })
  .select()

  return new Response(JSON.stringify({ data: data, error: error}))
}

export async function PUT(request:NextRequest) {
  const body =await request.json()

  const { data, error } = await supabase
  .from('statuses')
  .update({
    user_id: body.userId,
    place_id: body.placeId,
    working_status_id: body.workingStatusId,
    date: body.date,
    is_entered: true,
    scheduled_time_to_leave: body.scheduledTimeToLeave,
    comment: body.comment
  })
  .eq('user_id', body.userId)
  .eq('date', body.date)
  .select()

  return new Response(JSON.stringify({ data: data, error: error}))
}

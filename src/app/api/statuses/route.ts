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

  let updateData = null;
  switch (body.type) {
    case 'in':
      updateData = {
        place_id: body.placeId,
        working_status_id: body.workingStatusId,
        is_entered: true,
        scheduled_time_to_leave: body.scheduledTimeToLeave,
        comment: body.comment,
        updated_at: new Date(),
      }
      break;
    case 'out':
      updateData = {
        is_entered: false,
        updated_at: new Date(),
      }
      break;
    default:
      break;
  }

  if(!updateData) return new Response(JSON.stringify({ data: null, error: 'type is invalid'}))

  const { data, error } = await supabase
  .from('statuses')
  .update(updateData)
  .eq('user_id', body.userId)
  .eq('date', body.date)
  .select()

  return new Response(JSON.stringify({ data: data, error: error}))
}

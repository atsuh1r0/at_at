import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Top } from "./features/top";

const supabase = createClientComponentClient();

// 仮
const loginUserId = 1;

export default async function Home() {
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).slice(0, 10).replace(/\//g, '-');

  const usersData = await supabase
  .from('users')
  .select(`
    id,
    name,
    icon_path,
    posses(id, posse),
    generations(id, generation),
    statuses!inner(date, is_entered, scheduled_time_to_leave, comment, places(id, place), working_statuses(id, status))
  `)
  .eq('statuses.date', today);

  const loginUserData = await supabase
  .from('users')
  .select(`
    id,
    name,
    icon_path,
    posses(posse),
    generations(generation),
    statuses!inner(date, is_entered, scheduled_time_to_leave, comment, places(place), working_statuses(status))
  `)
  .eq('id', loginUserId);

  const placesData = await supabase
  .from('places')
  .select(`
    id,
    place
  `);

  const workingStatusesData = await supabase
  .from('working_statuses')
  .select(`
    id,
    status
  `);

  return (
      <Top usersData={usersData.data} loginUserData={loginUserData.data} placesData={placesData.data} workingStatusesData={workingStatusesData.data} />
  )
}

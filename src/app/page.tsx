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
    generations(id, generation)
  `);

  const loginUserData = await supabase
  .from('users')
  .select(`
    id,
    name,
    icon_path,
    posses(posse),
    generations(generation)
  `)
  .eq('id', loginUserId);

  const statusesData = await supabase
  .from('statuses')
  .select(`
    id,
    user_id,
    date,
    is_entered,
    scheduled_time_to_leave,
    comment,
    places(id, place),
    working_statuses(id, status)
  `)

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


  // usersDataに対応するtodayが今日の日付のstatusesレコードがある場合はそのレコードを追加、ない場合は空の配列を追加
  usersData.data?.forEach((user: any) => {
    const todayStatus = statusesData.data?.filter((status: any) => {
      return status.date === today && status.user_id === user.id
    });

    if(todayStatus?.length !== 0) {
      user.statuses = todayStatus;
    } else {
      user.statuses = [];
    }
  });

  // loginUserDataに対応するtodayが今日の日付のstatusesレコードがある場合はそのレコードを追加、ない場合は空の配列を追加
  loginUserData.data?.forEach((user: any) => {
    const todayStatus = statusesData.data?.filter((status: any) => status.date === today && status.user_id === user.id);

    if(todayStatus?.length !== 0) {
      user.statuses = todayStatus;
    } else {
      user.statuses = [];
    }
  });

  return (
      <Top usersData={usersData.data} loginUserData={loginUserData.data} placesData={placesData.data} workingStatusesData={workingStatusesData.data} />
  )
}

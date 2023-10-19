import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Top } from "./features/top";

const supabase = createClientComponentClient();

// 仮
const loginUserId = 1;

export default async function Home() {
    const usersData = await supabase.from('users').select('id, name, posses(posse),generations(generation), statuses(is_entered, scheduled_time_to_leave, comment, places(place), working_statuses(status))');

    const loginUserData = usersData.data?.filter((userData: any) => userData.id === loginUserId)[0];

  return (
      <Top usersData={usersData.data} loginUserData={loginUserData} />
  )
}

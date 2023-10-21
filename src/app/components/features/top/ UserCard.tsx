'use client'

import { User } from "@/app/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC } from "react"

const supabase = createClientComponentClient();

type Props = {
  userData: User;
}

export const UserCard: FC<Props> = ({userData}: Props) => {
  const { data } =  supabase.storage.from('userIcons').getPublicUrl(userData.icon_path.replace(/\s+/g, ""));
  const iconUrl = data.publicUrl;

  const displayPosse = (posse: number) => {
    switch (posse) {
      case 1:
        return "①";
      case 2:
        return "②";
      case 3:
        return "③";
      default:
        return "未設定";
    }
  };

  const displayFormattedDateTime = (time: string) => {
    return time.slice(0, 5);
  }

  return (
    <div className="flex gap-5 p-5 rounded-2xl items-center shadow-2xl shadow-gray-700/80 text-black bg-white">
      <div className="w-24 h-24 border-2 border-black rounded-full">
        <img src={iconUrl} alt="" className="rounded-full" />
      </div>
      <div>
        <div className="flex pr-4 border-b border-gray-400 w-full font-bold text-xl">
          <div className="mr-1">{displayPosse(userData.posses.posse)}</div>
          <div className="mr-2">{userData.generations.generation}期生</div>
          <div>{userData.name}</div>
        </div>
        <div className="flex gap-3">
          <div className="md:flex md:gap-2 mt-2 text-gray-500">
            <div>帰宅予定 {displayFormattedDateTime(userData.statuses[0].scheduled_time_to_leave)}</div>
            <div>@{userData.statuses[0].places.place}</div>
          </div>
          <div>
            <div className="inline-block mt-2 py-1 px-2 bg-orange-100 rounded">{userData.statuses[0].working_statuses.status}</div>
          </div>
        </div>
        <div className="inline-block mt-2 py-1 px-2 bg-gray-200 rounded-full">{userData.statuses[0].comment}</div>
      </div>
    </div>
  )
}

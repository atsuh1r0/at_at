'use client'

import { FC, useState } from "react"
import { FaChevronUp } from "react-icons/fa"
import { UsersToggleList } from "./UsersToggleList"
import { User } from "@/types/supabase"

type Props = {
  usersData: User[];
}

export const UsersToggleBox: FC<Props> = ({usersData}: Props) => {
  const [isOpened, setIsOpened] = useState(true)

  const filteredUsersData = usersData.filter((userData) => userData.statuses.length !== 0 && userData.statuses[0]?.is_entered === true);

  return (
    <div>
      <div
        className={
          "flex items-center bg-white mb-5 py-4 px-10 shadow-2xl text-blue-700 font-bold justify-between border border-blue-700 cursor-pointer rounded"
        }
        onClick={() => setIsOpened(!isOpened)}
      >
        <p>
          現在のHarbors
          <span className="ml-1 text-orange-500">{filteredUsersData.length}</span>
          人
        </p>
        <div>
          <FaChevronUp className={isOpened ? "fill-blue-600 text-xl" : "fill-blue-600 text-xl transform rotate-180"} />
        </div>
      </div>
      {isOpened && <UsersToggleList usersData={filteredUsersData} />}
    </div>
  )
}

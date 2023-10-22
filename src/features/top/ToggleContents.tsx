'use client'

import { UsersToggleBox } from "@/components/features/top/UsersToggleBox";
import { User } from "@/types/supabase";
import { FC } from "react";

type Props = {
  usersData: User[];
}

export const ToggleContents: FC<Props> = ({usersData}: Props) => {

  return (
    <section className="flex py-5 md:py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 max-w-xl w-full flex-col">
        <UsersToggleBox usersData={usersData} />
      </div>
    </section>
  )
}

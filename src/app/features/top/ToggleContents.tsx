'use client'

import { ToggleBox } from "@/app/components/features/top/ToggleBox";
import { User } from "@/app/types/supabase";
import { FC } from "react";

type Props = {
  usersData: User[];
}

export const ToggleContents: FC<Props> = ({usersData}: Props) => {

  return (
    <section className="flex py-5 md:py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 max-w-xl w-full flex-col">
        <ToggleBox usersData={usersData} />
      </div>
    </section>
  )
}

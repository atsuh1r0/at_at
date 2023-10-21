import { UserCard } from "@/app/components/features/top/ UserCard"
import { User } from "@/app/types/supabase";
import { FC } from "react"

type Props = {
  usersData: User[];
}

export const UsersToggleList: FC<Props> = ({usersData}: Props) => {
  return (
    <div
      className={
          "flex flex-col gap-5"
      }
    >
      {usersData.map((userData) => (
        <UserCard key={userData.id} userData={userData} />
      ))}
    </div>
  )
}

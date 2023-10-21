import { UserCard } from "@/app/components/features/top/ UserCard"
import { User } from "@/app/types/supabase";
import { FC } from "react"

type Props = {
  usersData: User[];
}

export const UsersToggleList: FC<Props> = ({usersData}: Props) => {
  const filteredUsersData = usersData.filter((userData) => userData.statuses.length !== 0);

  return (
    <div
      className={
          "flex flex-col gap-5"
      }
    >
      {filteredUsersData.map((userData) => (
        <UserCard key={userData.id} userData={userData} />
      ))}
    </div>
  )
}

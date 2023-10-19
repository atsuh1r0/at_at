import { UserCard } from "@/app/components/features/top/ UserCard"
import { User } from "@/app/types/supabase";
import { FC } from "react"

// 仮データ
// const users = [
//   {
//     id: 1,
//     posse: "②",
//     generation: 2,
//     name: "田中太郎",
//   },
//   {
//     id: 2,
//     posse: "②",
//     generation: 2,
//     name: "田中一郎",
//   },
//   {
//     id: 3,
//     posse: "①",
//     generation: 2,
//     name: "田中二郎",
//   },
//   {
//     id: 4,
//     posse: "①",
//     generation: 3,
//     name: "田中三郎",
//   },
//   {
//     id: 5,
//     posse: "②",
//     generation: 3,
//     name: "田中四郎",
//   },
// ]

type Props = {
  usersData: User[];
}

export const ToggleList: FC<Props> = ({usersData}: Props) => {
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

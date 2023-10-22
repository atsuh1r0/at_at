import { User } from "@/types/supabase"
import { FC } from "react"

type Props = {
  loginUserData: User
}

export const Header: FC<Props> = ({loginUserData}: Props) => {
  return (
    <header className="flex p-2 justify-between items-center bg-blue-400">
      <div className="text-white">
        {loginUserData.name}
        <span>
          さん
        </span>
      </div>
      <div>
        <img src="/logo.png" alt="" className="w-12 h-12" />
      </div>
    </header>
  )
}


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
      <div className="flex items-center gap-3">
        <form action="/auth/sign-out" method="post">
          <button className="mt-1 py-1 px-2 text-sm text-blue-600 rounded-full no-underline bg-white hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
        <img src="/logo.png" alt="" className="w-14 h-14" />
      </div>
    </header>
  )
}

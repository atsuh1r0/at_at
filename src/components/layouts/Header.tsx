import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { User } from '@/types/supabase'

type Props = {
  loginUserData: User
}

export const Header: FC<Props> = ({ loginUserData }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    if (!loginUserData.auth_id) {
      router.push('/login')
    } else {
      router.push(`/profile/?id=${loginUserData.auth_id}`)
    }
  }

  return (
    <header className="flex p-2 justify-between items-center bg-blue-400">
      <div className="text-white cursor-pointer" onClick={handleClick}>
        {loginUserData.name}
        <span>さん</span>
      </div>
      <div className="flex items-center gap-3">
        <form action="/auth/sign-out" method="post">
          <button className="mt-1 py-1 px-2 text-sm text-blue-600 rounded-full no-underline bg-white hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
        <Link href={`/?id=${loginUserData.auth_id}`} passHref>
          <div>
            <img src="/logo.png" alt="" className="w-14 h-14" />
          </div>
        </Link>
      </div>
    </header>
  )
}

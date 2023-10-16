import { FC } from "react"

type Props = {
  user: {
    id: number
    posse: string
    generation: number
    name: string
  }
}

export const UserCard: FC<Props> = ({user}: Props) => {
  return (
    <div className="flex gap-5 p-5 rounded-2xl items-center shadow-2xl shadow-gray-700/80 text-black bg-white">
      <div className="w-24 h-24 border-2 border-black rounded-full">
        <img src="/ono.jpg" alt="" className="rounded-full" />
      </div>
      <div>
        <div className="flex pr-4 border-b border-gray-400 w-full font-bold text-xl">
          <div className="mr-1">{user.posse}</div>
          <div className="mr-2">{user.generation}期生</div>
          <div>{user.name}</div>
        </div>
        <div className="flex gap-3">
          <div className="md:flex md:gap-2 mt-2 text-gray-500">
            <div>帰宅予定 09:30</div>
            <div>@カフェ</div>
          </div>
          <div>
            <div className="inline-block mt-2 py-1 px-2 bg-orange-100 rounded">外出中</div>
          </div>
        </div>
        <div className="inline-block mt-2 py-1 px-2 bg-gray-200 rounded-full">がんばる！</div>
      </div>
    </div>
  )
}

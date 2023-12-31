'use client'


import { FC, useState } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { LoadingOverlay } from "../../common/LoadingOverlay"
import { User } from "@/types/supabase"
import { getUsersWithTodayStatuses } from "@/services/getUsersWithTodayStatuses"
import { putStatuses } from "@/services/putStatuses"

type Props = {
  loginUserData: User
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>
}

export const EntranceButton: FC<Props> = ({loginUserData, isEntered, setIsEntered, setIsModalOpened, setUsersData}: Props) => {
  const [onLoading, setOnLoading] = useState(false)
    // 1日が01となるようにする
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const dateParts = today.split(' ')[0].split('/');
  const formattedDate = `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}`;

  const handleClickForIn = () => {
    setIsModalOpened(true)
  }

  const handleClickForOut = async() => {
    if(!confirm("退室しますか？")) return

    setOnLoading(true)

    const reqBodyData = JSON.stringify({
      userId: loginUserData.id,
      date: formattedDate,
      type: 'out'
    })

    const resData = await putStatuses(reqBodyData)

    if(resData.error) {
      alert("エラーが発生しました。")
      return
    }

    const usersWithStatusesDataRes = await getUsersWithTodayStatuses();
    setUsersData(usersWithStatusesDataRes)
    setIsEntered(false)
    setOnLoading(false)
  }

  return (
    <>
      <button
        className={
          isEntered ?
            "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/50 flex-row-reverse"
          :
            "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/50"
        }
        onClick={isEntered ? handleClickForOut : handleClickForIn}
      >
        <div></div>
        <div className="text-blue-700 text-3xl font-bold">
          {isEntered ? "OUT" : "IN"}
        </div>
        {isEntered ? <FaArrowLeft className="fill-blue-600 text-xl" /> : <FaArrowRight className="fill-blue-600 text-xl" />}
      </button>
      {onLoading &&
        <LoadingOverlay />
      }
    </>
  )
}

import { User } from "@/app/types/supabase"
import { FC } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

type Props = {
  loginUserData: User
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntranceButton: FC<Props> = ({loginUserData, isEntered, setIsEntered, setIsModalOpened}: Props) => {
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).slice(0, 10).replace(/\//g, '-');

  const handleClickForIn = () => {
    setIsModalOpened(true)
  }

  const handleClickForOut = async() => {
    const reqBodyData = JSON.stringify({
      userId: loginUserData.id,
      date: today,
      type: 'out'
    })

    const res = await fetch('/api/statuses', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBodyData,
    })
    const resData = await res.json()

    if(resData.error) {
      alert("エラーが発生しました。")
      console.log(resData.error)
      return
    }

    console.log(resData.data)


    // isEnteredがtrueの場合は、入室中であるため、退室ボタンを押したことになる
    // if(isEntered) setIsEntered(!isEntered)
  }

  return (
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
  )
}

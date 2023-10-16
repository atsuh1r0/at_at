import { FC } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

type Props = {
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setRecordType: React.Dispatch<React.SetStateAction<string>>
}

export const EntranceButton: FC<Props> = ({isEntered, setIsEntered, setIsModalOpened, setRecordType}: Props) => {
  const handleClick = () => {
    setIsModalOpened(!isEntered)

    // isEnteredがtrueの場合は、入室中であるため、退室ボタンを押したことになる
    if(isEntered) setIsEntered(!isEntered)
  }

  return (
    <button
      className={
        isEntered ?
          "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/50 flex-row-reverse"
        :
          "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/50"
      }
      onClick={handleClick}
    >
      <div></div>
      <div className="text-blue-700 text-3xl font-bold">
        {isEntered ? "OUT" : "IN"}
      </div>
      {isEntered ? <FaArrowLeft className="fill-blue-600 text-xl" /> : <FaArrowRight className="fill-blue-600 text-xl" />}
    </button>
  )
}

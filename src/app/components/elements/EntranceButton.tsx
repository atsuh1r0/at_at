import { FC } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

type Props = {
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntranceButton: FC<Props> = ({isEntered, setIsEntered}: Props) => {
  const handleClick = () => {
    setIsEntered(!isEntered)
  }

  return (
    <button
      className={
        isEntered ?
          "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl flex-row-reverse"
        :
          "flex gap-10 items-center bg-white py-2 px-10 rounded-full shadow-2xl"
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

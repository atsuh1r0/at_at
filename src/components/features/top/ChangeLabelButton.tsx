import { FC } from "react"

type Props = {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChangeLabelButton: FC<Props> = ({setIsModalOpened}: Props) => {
  const handleClick = () => {
    setIsModalOpened(true)
  }

  return (
    <button
      className={
          "flex items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/80 text-blue-700 font-bold justify-center"
      }
      onClick={handleClick}
    >
      ラベル変更
    </button>
  )
}

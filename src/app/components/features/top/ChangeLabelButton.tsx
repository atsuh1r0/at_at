import { FC } from "react"

export const ChangeLabelButton: FC = () => {
  return (
    <button
      className={
          "flex items-center bg-white py-2 px-10 rounded-full shadow-2xl shadow-gray-700/80 text-blue-700 font-bold justify-center"
      }
    >
      ラベル変更
    </button>
  )
}

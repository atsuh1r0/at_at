import { FC } from "react"

type Props = {
  color?: string
  bgColor?: string
}

export const Loading: FC<Props> = ({color, bgColor}: Props) => {
  const ballColorSwitch = () => {
    switch (color) {
      case "skyblue":
        return "bg-blue-300"
      default:
        return "bg-blue-700"
    }
  }

  const ballColor = ballColorSwitch()

  return (
    <div className="flex justify-center" aria-label="読み込み中">
      <div className={`animate-ping h-3 w-3 bg-blue-700 rounded-full ${ballColor}`}></div>
      <div className={`animate-ping h-3 w-3 bg-blue-700 rounded-full mx-6 ${ballColor}`}></div>
      <div className={`animate-ping h-3 w-3 bg-blue-700 rounded-full ${ballColor}`}></div>
    </div>
  )
}

import { FC } from "react"

type Props = {
  isModalOpened: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  type: string
}


export const RecordStatusModal: FC<Props> = ({isModalOpened, setIsModalOpened, setIsEntered, type}: Props) => {
  const handleClick = () => {
    setIsEntered(isModalOpened)
    setIsModalOpened(!isModalOpened)
  }

  const buttonText = (): React.ReactNode => {
    switch (type) {
      case "create":
        return "作成"
      case "update":
        return "更新"
      default:
        return null;
    }
  }

  return (
    <>
      {isModalOpened && <div className="fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-gray-700/50 text-black rounded">
        <button onClick={handleClick}>{buttonText()}</button>
        </div>}
    </>
  )
}

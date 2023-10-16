import { FC } from "react"

type Props = {
  isModalOpened: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const Overlay: FC<Props> = ({isModalOpened, setIsModalOpened}: Props) => {
  return (
    <>
      {isModalOpened && <div onClick={() => setIsModalOpened(!isModalOpened)} className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50"></div>}
    </>
  )
}

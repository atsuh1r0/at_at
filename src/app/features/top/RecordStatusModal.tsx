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
      {isModalOpened &&
        <div className="fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-gray-700/50 text-black rounded">
          <div className="mb-5">
            <p className="pl-1 mb-2 text-blue-500 font-bold">場所</p>
            <select name="" id="" className="p-3 w-64 bg-gray-100 rounded" required>
              <option value="">ルーム</option>
              <option value="">屋上</option>
              <option value="">カフェ</option>
              <option value="">コワーキング</option>
            </select>
          </div>
          <div className="mb-5">
            <p className="pl-1 mb-2 text-blue-500 font-bold">帰宅予定</p>
            <input type="time" className="p-3 w-64 bg-gray-100 rounded" required />
          </div>
          <div className="mb-5">
            <p className="pl-1 mb-2 text-blue-500 font-bold">ステータス</p>
            <select name="" id="" className="p-3 w-64 bg-gray-100 rounded" required>
              <option value="">作業中</option>
              <option value="">外出中</option>
              <option value="">フリー</option>
            </select>
          </div>
          <div className="mb-5">
            <p className="pl-1 mb-2 text-blue-500 font-bold">
              一言
              <span className="ml-2 text-gray-500 text-xs">※10文字以内</span>
            </p>
            <input type="text" maxLength={10} className="p-3 w-64 bg-gray-100 rounded" required />
          </div>
          <div className="flex mt-10 justify-end">
            <button onClick={handleClick} className="py-3 px-8 bg-blue-400 text-white rounded">{buttonText()}</button>
          </div>
        </div>
      }
    </>
  )
}

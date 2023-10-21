import { Place, User, WorkingStatus } from "@/app/types/supabase"
import { FC } from "react"
import { useForm } from "react-hook-form"

type Props = {
  loginUserData: User;
  placesData: Place[];
  workingStatusesData: WorkingStatus[];
  isModalOpened: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  type: string
}

export const RecordStatusModal: FC<Props> = ({
  loginUserData,
    placesData,
    workingStatusesData,
    isModalOpened,
    setIsModalOpened,
    setIsEntered,
    type
  }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationRules = {
    placeId: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
    },
    scheduledTimeToLeave: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
    },
    workingStatusId: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
    },
    comment: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
      maxLength: {
        value: 10,
        message: '10文字以内で入力してください。',
      },
    },
  }

  const buttonText = (): React.ReactNode => {
    switch (type) {
      case "create":
        return "入室"
      case "update":
        return "更新"
      default:
        return null;
    }
  }

  const onSubmit = async(formData: any) => {
    const todayStatusRecord = loginUserData.statuses;
    const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).slice(0, 10).replace(/\//g, '-');

    // statusesに今日のレコードがある場合はupdate
    if(todayStatusRecord.length > 0) {
      const reqBodyData = JSON.stringify({
        userId: loginUserData.id,
        date: today,
        ...formData
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

      // console.log(resData.data)

    // statusesに今日のレコードがない場合はcreate
    }else {
      const reqBodyData = JSON.stringify({
        userId: loginUserData.id,
        date: today,
        ...formData
      })

      const res = await fetch('/api/statuses', {
        method: 'POST',
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

      // console.log(resData.data)
    }

    setIsEntered(isModalOpened)
    setIsModalOpened(!isModalOpened)
  };

  return (
    <>
      {isModalOpened &&
        <form className="fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-gray-700/50 text-black rounded" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="placeId" className="block pl-1 mb-2 text-blue-500 font-bold">場所</label>
            <select id="placeId" {...register('placeId', validationRules.placeId)} className="p-3 w-64 bg-gray-100 rounded">
              {placesData.map((place) => (
                <option key={place.id} value={place.id}>{place.place}</option>
              ))}
            </select>
            {errors.place?.message && <p className="mt-1 text-red-600 text-sm">{errors.place.message.toString()}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="scheduledTimeToLeave" className="block pl-1 mb-2 text-blue-500 font-bold">帰宅予定</label>
            <input id="scheduledTimeToLeave" {...register('scheduledTimeToLeave', validationRules.scheduledTimeToLeave)} type="time" className="p-3 w-64 bg-gray-100 rounded" />
            {errors.returnTime?.message && <p className="mt-1 text-red-600 text-sm">{errors.returnTime.message.toString()}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="workingStatusId" className="block pl-1 mb-2 text-blue-500 font-bold">ステータス</label>
            <select  id="workingStatusId" {...register('workingStatusId', validationRules.workingStatusId)} className="p-3 w-64 bg-gray-100 rounded">
              {workingStatusesData.map((workingStatus) => (
                <option key={workingStatus.id} value={workingStatus.id}>{workingStatus.status}</option>
              ))}
            </select>
            {errors.status?.message && <p className="mt-1 text-red-600 text-sm">{errors.status.message.toString()}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="comment" className="block pl-1 mb-2 text-blue-500 font-bold">
              一言
              <span className="ml-2 text-gray-500 text-xs">※10文字以内</span>
            </label>
            <input id="comment" {...register('comment', validationRules.comment)} type="text" className="p-3 w-64 bg-gray-100 rounded" maxLength={10} />
            {errors.comment?.message && <p className="mt-1 text-red-600 text-sm">{errors.comment.message.toString()}</p>}
          </div>
          <div className="flex mt-10 justify-end">
            <button type="submit" className="py-3 px-8 bg-blue-400 text-white rounded">{buttonText()}</button>
          </div>
        </form>
      }
    </>
  )
}

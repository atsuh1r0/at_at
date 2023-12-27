'use client'

import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendLineNotification } from '@/app/api/notifications/route'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'
import { createStatuses } from '@/services/createStatuses'
import { getUsersWithTodayStatuses } from '@/services/getUsersWithTodayStatuses'
import { putStatuses } from '@/services/putStatuses'
import { Place, User, WorkingStatus } from '@/types/supabase'

type Props = {
  loginUserData: User
  placesData: Place[]
  workingStatusesData: WorkingStatus[]
  isModalOpened: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>
}

export const RecordStatusModal: FC<Props> = ({
  loginUserData,
  placesData,
  workingStatusesData,
  isModalOpened,
  setIsModalOpened,
  setIsEntered,
  setUsersData,
}: Props) => {
  const [onLoading, setOnLoading] = useState(false)
  const todayStatusRecord = loginUserData.statuses
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  const dateParts = today.split(' ')[0].split('/')
  const formattedDate = `${dateParts[0]}-${dateParts[1].padStart(
    2,
    '0',
  )}-${dateParts[2].padStart(2, '0')}`
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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

  const onSubmit = async (formData: any) => {
    setOnLoading(true)

    if (todayStatusRecord.length > 0) {
      // statusesに今日のレコードがある場合はupdate
      const reqBodyData = JSON.stringify({
        userId: loginUserData.id,
        date: formattedDate,
        type: 'in',
        ...formData,
      })

      const resData = await putStatuses(reqBodyData)

      if (resData.error) {
        alert('エラーが発生しました。')
        setOnLoading(false)
        return
      }
    } else {
      // statusesに今日のレコードがない場合はcreate
      const reqBodyData = JSON.stringify({
        userId: loginUserData.id,
        date: formattedDate,
        ...formData,
      })

      const resData = await createStatuses(reqBodyData)

      if (resData.error) {
        alert('エラーが発生しました。')
        setOnLoading(false)
        return
      }
    }

    const usersWithStatusesDataRes = await getUsersWithTodayStatuses()
    setUsersData(usersWithStatusesDataRes)
    setIsEntered(true)
    setIsModalOpened(false)
    setOnLoading(false)

    // LINE通知
    const notificationMessage = `
${loginUserData.name}がHarborsに入室したよ！

日付：${formattedDate}
場所：${placesData[formData.placeId - 1].place}
帰宅予定：${formData.scheduledTimeToLeave}
ステータス：${workingStatusesData[formData.workingStatusId - 1].status}
一言：${formData.comment}
https://at-at-frontend.vercel.app/
`
    await sendLineNotification(notificationMessage)
  }

  return (
    <>
      {isModalOpened && (
        <form
          className="fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-gray-700/50 text-black rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-5">
            <label
              htmlFor="placeId"
              className="block pl-1 mb-2 text-blue-500 font-bold"
            >
              場所
            </label>
            <select
              id="placeId"
              defaultValue={
                todayStatusRecord.length > 0
                  ? todayStatusRecord[0].places.id
                  : ''
              }
              {...register('placeId', validationRules.placeId)}
              className="p-3 w-64 bg-gray-100 rounded"
            >
              {placesData.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.place}
                </option>
              ))}
            </select>
            {errors.placeId?.message && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.placeId.message.toString()}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="scheduledTimeToLeave"
              className="block pl-1 mb-2 text-blue-500 font-bold"
            >
              帰宅予定
            </label>
            <input
              id="scheduledTimeToLeave"
              defaultValue={
                todayStatusRecord.length > 0
                  ? todayStatusRecord[0].scheduled_time_to_leave
                  : ''
              }
              {...register(
                'scheduledTimeToLeave',
                validationRules.scheduledTimeToLeave,
              )}
              type="time"
              className="p-3 w-64 bg-gray-100 rounded"
            />
            {errors.scheduledTimeToLeave?.message && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.scheduledTimeToLeave.message.toString()}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="workingStatusId"
              className="block pl-1 mb-2 text-blue-500 font-bold"
            >
              ステータス
            </label>
            <select
              id="workingStatusId"
              defaultValue={
                todayStatusRecord.length > 0
                  ? todayStatusRecord[0].working_statuses.id
                  : ''
              }
              {...register('workingStatusId', validationRules.workingStatusId)}
              className="p-3 w-64 bg-gray-100 rounded"
            >
              {workingStatusesData.map((workingStatus) => (
                <option key={workingStatus.id} value={workingStatus.id}>
                  {workingStatus.status}
                </option>
              ))}
            </select>
            {errors.workingStatusId?.message && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.workingStatusId.message.toString()}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="comment"
              className="block pl-1 mb-2 text-blue-500 font-bold"
            >
              一言
              <span className="ml-2 text-gray-500 text-xs">※10文字以内</span>
            </label>
            <input
              id="comment"
              defaultValue={
                todayStatusRecord.length > 0 ? todayStatusRecord[0].comment : ''
              }
              {...register('comment', validationRules.comment)}
              type="text"
              className="p-3 w-64 bg-gray-100 rounded"
              maxLength={10}
            />
            {errors.comment?.message && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.comment.message.toString()}
              </p>
            )}
          </div>
          <div className="flex mt-10 justify-end">
            <button
              type="submit"
              className="py-3 px-8 bg-blue-500 text-white rounded"
            >
              {todayStatusRecord.length === 0 ||
              todayStatusRecord[0].is_entered == false
                ? '入室'
                : '更新'}
            </button>
          </div>
        </form>
      )}
      {onLoading && <LoadingOverlay />}
    </>
  )
}

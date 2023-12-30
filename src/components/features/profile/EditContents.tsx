'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/common/Loading'
import { Header } from '@/components/layouts/Header'
import { getGenerations } from '@/services/getGenerations'
import { getPosses } from '@/services/getPosses'
import { getUsersWithTodayStatuses } from '@/services/getUsersWithTodayStatuses'
import { User } from '@/types/supabase'

const EditContents = () => {
  const supabase = createClientComponentClient<User>()
  const router = useRouter()

  const searchParams = useSearchParams()
  const uuid = searchParams.get('id')

  const [userName, setUserName] = useState('')
  const [message, setMessage] = useState('')
  const [possesData, setPossesData] = useState([])
  const [generationsData, setGenerationsData] = useState([])
  const [posseId, setPosseId] = useState('')
  const [generationId, setGenerationId] = useState('')
  const [loginUserData, setLoginUserData] = useState<User>()

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersWithStatusesDataRes = await getUsersWithTodayStatuses()
      const loginUserWithStatusesData = usersWithStatusesDataRes.filter(
        (userData: User) => userData.auth_id === uuid,
      )
      setLoginUserData(loginUserWithStatusesData[0])
    }
    fetchUsersData()
  }, [uuid])

  useEffect(() => {
    const fetchUsersData = async () => {
      const possesDataRes = await getPosses()
      const generationDataRes = await getGenerations()

      setPossesData(possesDataRes)
      setGenerationsData(generationDataRes)
    }
    fetchUsersData()
  }, [])

  useEffect(() => {
    const fetchInitialUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('name, posse_id, generation_id')
          .eq('auth_id', uuid)
          .single()

        if (error) {
          console.error('データの取得中にエラーが発生しました:', error)
          return
        }

        if (data) {
          setUserName(data.name || '')
          setPosseId(data.posse_id || '')
          setGenerationId(data.generation_id || '')
        }
      } catch (err) {
        console.error('データの取得中にエラーが発生しました:', err)
      }
    }

    fetchInitialUserData()
  }, [uuid])

  const displayPosse = (posse: number) => {
    switch (posse) {
      case 1:
        return '①'
      case 2:
        return '②'
      case 3:
        return '③'
      default:
        return '未設定'
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    try {
      await supabase
        .from('users')
        .update({
          name: userName,
          posse_id: parseInt(event.currentTarget.posseId.value),
          generation_id: parseInt(event.currentTarget.generationId.value),
        })
        .eq('auth_id', uuid)
        .single()
      setMessage('プロフィールを更新しました')
      router.push(`/profile/?id=${uuid}`)
    } catch (error) {
      setMessage('プロフィールの更新中にエラーが発生しました')
    }
  }

  return (
    <>
      {loginUserData ? (
        <>
          <Header loginUserData={loginUserData} />
          <main className="h-screen bg-blue-200">
            <div className="text-center font-bold text-xl pt-5 mb-1 text-black">
              プロフィール変更
            </div>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto">
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
              >
                {/* user posse */}
                <label className="text-md text-black" htmlFor="posseId">
                  所属POSSE
                </label>
                <select
                  id="posseId"
                  className="border rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 block text-black"
                  value={posseId}
                  onChange={(event) => setPosseId(event.target.value)}
                >
                  {possesData.map((posse: any) => (
                    <option key={posse.id} value={posse.id}>
                      POSSE{displayPosse(posse.posse)}
                    </option>
                  ))}
                </select>
                {/* user generation */}
                <label className="text-md text-black" htmlFor="generationId">
                  期生
                </label>
                <select
                  id="generationId"
                  className="border rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 block text-black"
                  value={generationId}
                  onChange={(event) => setGenerationId(event.target.value)}
                >
                  {generationsData.map((generation: any) => (
                    <option key={generation.id} value={generation.id}>
                      {generation.generation}期生
                    </option>
                  ))}
                </select>
                {/* user name */}
                <label className="text-md text-black">ユーザー名</label>
                <input
                  type="text"
                  className="border rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 block text-black"
                  placeholder="名前"
                  value={userName}
                  onChange={handleNameChange}
                  required
                  maxLength={16}
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 font-bold w-8/12 rounded-full p-2 mt-7 mx-auto block"
                >
                  変更
                </button>
              </form>
              {message && (
                <div className="text-center text-green-600 mt-4">{message}</div>
              )}
              <button
                onClick={() => router.push(`/?id=${uuid}`)}
                className="bg-white text-blue-600 font-bold w-8/12 rounded-full p-2 mt-7 mx-auto block"
              >
                topへ戻る
              </button>
            </div>
          </main>
        </>
      ) : (
        <div className="flex h-screen bg-blue-200 justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  )
}

export default EditContents

'use client'

import { Loading } from '@/components/common/Loading';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { createUserInfo } from '@/services/createUserInfo';
import { getAuthSession } from '@/services/getAuthSession';
import { getGenerations } from '@/services/getGenerations';
import { getPosses } from '@/services/getPosses';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
  const [onSubmitLoading, setOnSubmitLoading] = useState(false)
  const [possesData, setPossesData] = useState([]);
  const [generationsData, setGenerationsData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    const fetchUsersData = async () => {
      const possesDataRes = await getPosses();
      const generationDataRes = await getGenerations();

      setPossesData(possesDataRes);
      setGenerationsData(generationDataRes);
    }
    fetchUsersData();
  }, []);

  const validationRules = {
    name: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
      maxLength: {
        value: 16,
        message: '16文字以内で入力してください。',
      },
    },
    posseId: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
    },
    generationId: {
      required: {
        value: true,
        message: '入力が必須の項目です。',
      },
    },
  }

  const displayPosse = (posse: number) => {
    switch (posse) {
      case 1:
        return "①";
      case 2:
        return "②";
      case 3:
        return "③";
      default:
        return "未設定";
    }
  };

  const onSubmit = async(formData: any) => {
    setOnSubmitLoading(true)

    const sessionData = await getAuthSession();
    const uuid = sessionData?.user.id;
    if(!uuid) {
      alert("セッションが切れました。ログインし直してください。")
      setOnSubmitLoading(false)
      router.push('/login')
      return
    }

    // 画像は一旦保留

    // if(formData.icon.length == 0) {
    //   delete formData.icon
    // }

    // if(formData.icon[0].type !== 'image/png' && formData.icon[0].type !== 'image/jpeg') {
    //   alert("画像ファイルを選択してください。")
    //   setOnSubmitLoading(false)
    //   return
    // }

    const reqBodyData = JSON.stringify({
      authId: uuid,
      ...formData,
    })

    const resData = await createUserInfo(reqBodyData)

    if(resData.error) {
      alert("エラーが発生しました。")
      setOnSubmitLoading(false)
      return
    }

    setOnSubmitLoading(false)
    router.push('/')
  }

  return (
    <>
      {
        possesData.length !== 0 && generationsData.length !== 0 ? (
          <div className='flex h-screen justify-center items-center bg-white text-black'>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
              <form
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="text-md" htmlFor="name">
                  ユーザー名
                </label>
                <input
                  id='name'
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  placeholder="ポッセ太郎"
                  {...register('name', validationRules.name)}
                />
                {errors.name?.message && <p className="mt-1 text-red-600 text-sm">{errors.name.message.toString()}</p>}
                <label className="text-md" htmlFor="posseId">
                  所属POSSE
                </label>
                <select
                  id='posseId'
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  {...register('posseId', validationRules.posseId)}
                >
                  {possesData.map((posse: any) => (
                    <option key={posse.id} value={posse.id}>POSSE{displayPosse(posse.posse)}</option>
                  ))}
                </select>
                {errors.posseId?.message && <p className="mt-1 text-red-600 text-sm">{errors.posseId.message.toString()}</p>}
                <label className="text-md" htmlFor="generationId">
                  期生
                </label>
                <select
                  id='generationId'
                  className="rounded-md px-4 py-2 bg-inherit border mb-6"
                  {...register('generationId', validationRules.generationId)}
                >
                  {generationsData.map((generation: any) => (
                    <option key={generation.id} value={generation.id}>{generation.generation}期生</option>
                  ))}
                </select>
                {errors.generationId?.message && <p className="mt-1 text-red-600 text-sm">{errors.generationId.message.toString()}</p>}
                {/* <label className="text-md" htmlFor="icon">
                  アイコン画像
                </label>
                <input
                  className="px-4 mb-6"
                  type='file'
                  {...register('icon')}
                /> */}
                <button className="bg-blue-500 rounded px-4 py-2 text-white mb-2" type='submit'>
                  登録
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex h-screen bg-white justify-center items-center">
            <Loading />
          </div>
        )
      }
      {onSubmitLoading &&
        <LoadingOverlay />
      }
    </>
  )
}

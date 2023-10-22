import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Top } from "./features/top/Top";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({cookies});

export default async function Home() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(!user) {
    await fetch('/auth/sign-out', {method: 'POST'})
    return <></>
  }
  const loginUserUuid = user.id;

  return (
      <Top loginUserUuid={loginUserUuid} />
  )
}

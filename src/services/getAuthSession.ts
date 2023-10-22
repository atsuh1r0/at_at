import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const getAuthSession = async() => {
  const session = await supabase.auth.getSession()
  return session.data.session;
}

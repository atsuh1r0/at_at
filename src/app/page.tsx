import Top from "./features/top";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default async function Home() {
  const { data } = await supabase.from('users').select()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

// type Post = {
//   id: number;
//   name: string;
// }

export default function Home() {
  // const supabase = createClientComponentClient<Database>()
  // const { data: posts } = await supabase.from("users").select("id, name");
    
  // return posts.map((post : Post ) => (
  //   <p key={post.id}>
  //     <Link href={`/static/${post.id}`}>{post.name}</Link>
  //   </p>
  // ));
    
  return (
    <main className="h-screen bg-blue-200">
      <Top />
    </main>
  )
}

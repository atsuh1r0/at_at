import { ChangeLabelButton } from "@/components/features/top/ChangeLabelButton";
import { EntranceButton } from "@/components/features/top/EntranceButton";
import { User } from "@/types/supabase";
import { FC} from "react";

type Props = {
  loginUserData: User
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>
}

export const FirstView: FC<Props> = ({loginUserData, isEntered, setIsEntered, setIsModalOpened, setUsersData}: Props) => {

  return (
    <section className="flex py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 h-56 w-96 bg-gradient-to-l from-blue-500 to-blue-300 rounded-3xl shadow-2xl shadow-gray-700/80 flex-col justify-center items-center">
        <EntranceButton
          loginUserData={loginUserData}
          isEntered={isEntered}
          setIsEntered={setIsEntered}
          setIsModalOpened={setIsModalOpened}
          setUsersData={setUsersData}
        />
        {isEntered ? <ChangeLabelButton setIsModalOpened={setIsModalOpened} /> : ""}
      </div>
    </section>
  )
}

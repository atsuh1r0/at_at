import { ChangeLabelButton } from "@/app/components/features/top/ChangeLabelButton";
import { EntranceButton } from "@/app/components/features/top/EntranceButton";
import { FC} from "react";

type Props = {
  isEntered: boolean
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setRecordType: React.Dispatch<React.SetStateAction<string>>
}

export const FirstView: FC<Props> = ({isEntered, setIsEntered, setIsModalOpened, setRecordType}: Props) => {

  return (
    <section className="flex py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 h-56 w-96 bg-gradient-to-l from-blue-500 to-blue-300 rounded-3xl shadow-2xl shadow-gray-700/80 flex-col justify-center items-center">
        <EntranceButton isEntered={isEntered} setIsEntered={setIsEntered} setIsModalOpened={setIsModalOpened} setRecordType={setRecordType} />
        {isEntered ? <ChangeLabelButton /> : ""}
      </div>
    </section>
  )
}

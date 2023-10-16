'use client'

import { ChangeLabelButton } from "@/app/components/features/top/ChangeLabelButton";
import { EntranceButton } from "@/app/components/features/top/EntranceButton";
import { useState } from "react";

export default function FirstView() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <section className="flex py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 h-56 w-96 bg-gradient-to-l from-blue-500 to-blue-300 rounded-3xl shadow-2xl shadow-gray-700/80 flex-col justify-center items-center">
        <EntranceButton isEntered={isEntered} setIsEntered={setIsEntered} />
        {isEntered ? <ChangeLabelButton /> : ""}
      </div>
    </section>
  )
}

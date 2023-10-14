'use client'

import { ChangeLabelButton } from "@/app/components/elements/ChangeLabelButton";
import { EntranceButton } from "@/app/components/elements/EntranceButton";
import { useState } from "react";

export default function FirstView() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <section className="flex py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 py-20 px-28 bg-blue-400 rounded-3xl shadow-2xl flex-col">
        <EntranceButton isEntered={isEntered} setIsEntered={setIsEntered} />
        {isEntered ? <ChangeLabelButton /> : ""}
      </div>
    </section>
  )
}

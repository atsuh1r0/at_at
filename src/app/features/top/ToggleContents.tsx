'use client'

import { ToggleBox } from "@/app/components/features/top/ToggleBox";

export default function ToggleContents() {

  return (
    <section className="flex py-5 md:py-10 px-3 w-full bg-blue-200 justify-center">
      <div className="flex gap-5 max-w-xl w-full flex-col">
        <ToggleBox />
      </div>
    </section>
  )
}

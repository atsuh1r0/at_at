'use client'

import Header from "@/app/components/layouts/Header";
import ToggleContents from "./ToggleContents";
import { Overlay } from "@/app/components/common/Overlay";
import { FC, useState } from "react";
import { RecordStatusModal } from "./RecordStatusModal";
import { FirstView } from "./FirstView";

// supebase側で型情報の設定が必要？なため一旦anyとする
type Props = {
  usersData: any;
  loginUserData: any;
}

export const Top: FC<Props> = ({usersData, loginUserData}: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [recordType, setRecordType] = useState("create")
  const [isEntered, setIsEntered] = useState(false);

  return (
    <>
      <Header />
      <main className="h-screen bg-blue-200">
        <FirstView isEntered={isEntered} setIsEntered={setIsEntered} setIsModalOpened={setIsModalOpened} setRecordType={setRecordType} />
        <ToggleContents />

        {/* modal */}
        <Overlay isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
        <RecordStatusModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} setIsEntered={setIsEntered} type={recordType} />
      </main>
    </>
  )
}

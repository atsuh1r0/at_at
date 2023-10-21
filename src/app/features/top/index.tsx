'use client'

import { Overlay } from "@/app/components/common/Overlay";
import { FC, useEffect, useState } from "react";
import { RecordStatusModal } from "./RecordStatusModal";
import { FirstView } from "./FirstView";
import { Header } from "@/app/components/layouts/Header";
import { ToggleContents } from "./ToggleContents";

// supebase側で型情報の設定が必要？なため一旦anyとする
type Props = {
  usersData: any;
  loginUserData: any;
  placesData: any;
  workingStatusesData: any;
}

export const Top: FC<Props> = ({usersData, loginUserData, placesData, workingStatusesData}: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isEntered, setIsEntered] = useState(loginUserData[0].statuses[0]?.is_entered);

  return (
    <>
      <Header loginUserData={loginUserData[0]} />
      <main className="h-screen bg-blue-200">
        <FirstView loginUserData={loginUserData[0]} isEntered={isEntered} setIsEntered={setIsEntered} setIsModalOpened={setIsModalOpened} />
        <ToggleContents usersData={usersData} />

        {/* modal */}
        <Overlay isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
        <RecordStatusModal
          loginUserData={loginUserData[0]}
          placesData={placesData}
          workingStatusesData={workingStatusesData}
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          setIsEntered={setIsEntered}
        />
      </main>
    </>
  )
}

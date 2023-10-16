'use client'

import Header from "@/app/components/layouts/Header";
import ToggleContents from "./ToggleContents";
import { Overlay } from "@/app/components/common/Overlay";
import { useState } from "react";
import { RecordStatusModal } from "./RecordStatusModal";
import { FirstView } from "./FirstView";

export default function Top() {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [recordType, setRecordType] = useState("create")
  const [isEntered, setIsEntered] = useState(false);


  return (
    <>
      <Header />
      <FirstView isEntered={isEntered} setIsEntered={setIsEntered} setIsModalOpened={setIsModalOpened} setRecordType={setRecordType} />
      <ToggleContents />

      {/* modal */}
      <Overlay isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
      <RecordStatusModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} setIsEntered={setIsEntered} type={recordType} />
    </>
  )
}

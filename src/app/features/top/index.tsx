'use client'

import { Overlay } from "@/app/components/common/Overlay";
import { FC, useEffect, useState } from "react";
import { RecordStatusModal } from "./RecordStatusModal";
import { FirstView } from "./FirstView";
import { Header } from "@/app/components/layouts/Header";
import { ToggleContents } from "./ToggleContents";
import { getUsersWithTodayStatuses } from "@/app/services/getUsersWithTodayStatuses";
import { User } from "@/app/types/supabase";
import { getPlaces } from "@/app/services/getPlaces";
import { getWorkingStatuses } from "@/app/services/getWorkingStatuses";

// 仮
const loginUserId = 1;

export const Top: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isEntered, setIsEntered] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loginUserData, setLoginUserData] = useState<User>();
  const [placesData, setPlacesData] = useState([]);
  const [workingStatusesData, setWorkingStatusesData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersWithStatusesDataRes = await getUsersWithTodayStatuses();
      const loginUserWithStatusesData = usersWithStatusesDataRes.filter((userData: User) => userData.id === loginUserId);
      const placesDataRes = await getPlaces();
      const workingStatusesDataRes = await getWorkingStatuses();

      setUsersData(usersWithStatusesDataRes);
      setLoginUserData(loginUserWithStatusesData[0]);
      setPlacesData(placesDataRes);
      setWorkingStatusesData(workingStatusesDataRes);
      setIsEntered(loginUserWithStatusesData[0].statuses[0].is_entered);
    }
    fetchUsersData();
  }, []);

  return (
    <>
      {
        loginUserData ?
          <>
            <Header loginUserData={loginUserData} />
            <main className="h-screen bg-blue-200">
              <FirstView
                loginUserData={loginUserData}
                isEntered={isEntered}
                setIsEntered={setIsEntered}
                setIsModalOpened={setIsModalOpened}
                setUsersData={setUsersData}
              />
              <ToggleContents usersData={usersData} />
              <Overlay isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
              <RecordStatusModal
                loginUserData={loginUserData}
                placesData={placesData}
                workingStatusesData={workingStatusesData}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
                setIsEntered={setIsEntered}
                setUsersData={setUsersData}
              />
            </main>
          </>
          :
            <div>loading...</div>
        }
    </>

  )
}

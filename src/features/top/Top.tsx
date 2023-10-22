'use client'

import { ModalOverlay } from "@/components/common/ModalOverlay";
import { FC, useEffect, useState } from "react";
import { RecordStatusModal } from "./RecordStatusModal";
import { FirstView } from "./FirstView";
import { Header } from "@/components/layouts/Header";
import { ToggleContents } from "./ToggleContents";
import { getUsersWithTodayStatuses } from "@/services/getUsersWithTodayStatuses";
import { User } from "@/types/supabase";
import { getPlaces } from "@/services/getPlaces";
import { getWorkingStatuses } from "@/services/getWorkingStatuses";
import { Loading } from "@/components/common/Loading";

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
      setIsEntered(loginUserWithStatusesData[0].statuses.length > 0 ? loginUserWithStatusesData[0].statuses[0].is_entered : false);
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
              <ModalOverlay isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
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
          <div className="flex h-screen bg-blue-200 justify-center items-center">
            <Loading />
          </div>
        }
    </>

  )
}

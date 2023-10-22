import { FC } from "react"
import { Loading } from "./Loading"

export const LoadingOverlay: FC = () => {
  return (
    <>
      <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading color="skyblue" />
        </div>
      </div>
    </>
  )
}

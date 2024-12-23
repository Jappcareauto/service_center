import IMAGES from "@/assets/images"
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton"
import KeyboardArrowDownIcon from "@/shared/generics/icons/KeyboardArrowDownIcon"
import Notification2Icon from "@/shared/generics/icons/Notification2Icon"
import ExpendedIcon from "@/shared/generics/menu/icons/ExpendedIcon"
import Home2Icon from "@/shared/generics/menu/icons/Home2Icon"
import OpenIcon from "@/shared/generics/menu/icons/OpenIcon"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

const DisclosiorAlertComponent = () => {
  const [disclosure, setDisclosure] = useState(false);
  return (
    <div className='bg-primaryAccent px-4 py-3 rounded-[20px]'>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Notification2Icon />
          <h2 className="font-medium">Emergency Assitance Request</h2>
        </div>
        <KeyboardArrowDownIcon
          onClick={() => setDisclosure(!disclosure)}
          className={
            twMerge(
              "cursor-pointer transition-all duration-300",
              disclosure ? "-rotate-180" : ""
            )
          } />
      </div>
      <div className='flex items-center w-full gap-x-4 mt-3 mb-4 font-normal'>
        <div className='rounded-full border-[2px] border-primary p-[1.5px]'>
          <img src={IMAGES.avatar} alt="" className='w-12 h-12' />
        </div>
        <p>Dave’s Garage</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <p>Porsche Taycan Turbo S</p>
          <p>Break Failure</p>
          <p>7000 Frs</p>
          <p>12km Away</p>
        </div>
        <div className="flex items-center gap-x-3">
          <PrimaryButton
            className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
          >
            Decline
          </PrimaryButton>
          <PrimaryButton
            className="border border-black h-10 rounded-full font-normal text-sm"
          >
            Accept
          </PrimaryButton>
        </div>
      </div>
      <div className={
        twMerge(
          "transition-all duration-300 overflow-hidden grid grid-cols-2 gap-x-4 pt-3",
          disclosure ? "max-h-[500px]" : "max-h-0"
        )
      }>
        <div>
          <p className="text-grey4">Added Note</p>
          <p>Hello, Please I have a break failure, the pedal seems very loose.</p>
        </div>
        <div className="bg-map bg-cover bg-center w-full h-[135px] rounded-xl p-2 relative flex items-center justify-center">
          <div className="flex justify-end items-center gap-x-2 absolute right-2 top-2">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <ExpendedIcon />
            </button>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <OpenIcon />
            </button>
          </div>
          <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white">
            <Home2Icon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisclosiorAlertComponent

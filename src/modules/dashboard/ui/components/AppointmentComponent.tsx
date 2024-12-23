import IMAGES from '@/assets/images'
import PrimaryButton from '@/shared/generics/buttons/PrimaryButton'
import Calendar2Icon from '@/shared/generics/menu/icons/Calendar2Icon'
import LocationIcon from '@/shared/generics/menu/icons/LocationIcon'
import { ModalEventKey } from '@/shared/helpers/hooks/ModalEventKey'
import { ModalEvents } from '@/shared/helpers/hooks/useModal'

const AppointmentComponent = () => {
  return (
    <div className='border border-borderColor rounded-[20px] bg-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center w-full gap-x-4 font-normal'>
          <div className='rounded-full border-[2px] border-primary p-[1.5px]'>
            <img src={IMAGES.avatar} alt="" className='w-12 h-12' />
          </div>
          <p>James Mann</p>
        </div>
        <div className={"text-sm rounded-2xl px-3 py-2 bg-primaryAccent whitespace-nowrap text-primary"}>
          In Progress
        </div>
      </div>
      <h2 className='font-medium mt-3 text-primary'>Body shop appointment</h2>
      <h2 className='font-medium mt-1'>Porsche Taycan Turbo S</h2>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-x-8'>
          <div className='flex items-center gap-x-1 text-grey4'>
            <Calendar2Icon />
            <p>Oct, 20, 2024 10am</p>
          </div>
          <div className='flex items-center gap-x-1 text-grey4'>
            <LocationIcon />
            <p>At Home</p>
          </div>
        </div>
        <PrimaryButton
          onClick={()=>ModalEvents.open(ModalEventKey.APPOINTMENT_DETAILS)}
          className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
        >
          See Details
        </PrimaryButton>
      </div>
    </div>
  )
}

export default AppointmentComponent

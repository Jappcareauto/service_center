import IMAGES from '@/assets/images'
import Avatar from '@/shared/generics/Avatar'
import InputTextArea from '@/shared/generics/inputs/InputTextArea'
import Calendar2Icon from '@/shared/generics/menu/icons/Calendar2Icon'
import LocationIcon from '@/shared/generics/menu/icons/LocationIcon'
import Tag from '@/shared/generics/Tag'

const AppointmentExpandDetailsView = () => {
  return (
    <div className="grid grid-cols-[auto_360px] gap-x-32">
      <div>
        <h2 className='font-medium'>Appointment Details</h2>
        <div className='mt-10 flex flex-col gap-y-6'>
          <div className="flex justify-between items-center">
            <Avatar />
            <Tag />
          </div>
          <div>
            <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4 max-w-[355px]">
              <img src={IMAGES.car} alt="" />
            </div>
            <h1 className="font-medium mt-4">Porsche Taycan Turbo S</h1>
            <p>2024, RWD</p>
          </div>

          <div className="">
            <h2 className="text-primary font-medium">Body shop appointment</h2>
            <div className='flex flex-col gap-y-2 mt-4'>
              <div className='flex items-center gap-x-1 text-grey4'>
                <Calendar2Icon />
                <p>Oct, 20, 2024 10am</p>
              </div>
              <div className='flex items-center gap-x-1 text-grey4'>
                <LocationIcon />
                <p>At Home</p>
              </div>
            </div>
          </div>
          <p>There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch, situated near the car's side profile. The dent is below the horizontal line of the rear headlight and sits closer to the lower third of the rear bumper.</p>
          <div className="flex flex-col gap-y-3 mt-5">
            <h2 className="font-medium">Images</h2>
            <div className="flex flex-row overflow-x-auto w-full">
              {
                [
                  IMAGES.car2,
                  IMAGES.car2,
                  IMAGES.car2,
                  IMAGES.car2,
                ].map((image, index) => {
                  return <img
                    className="w-[140px] h-[140px] rounded-[20px] mr-2"
                    key={'image-' + index}
                    src={image} alt="" />
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0 h-screen bg-background w-[420px] shadow-lg flex flex-col gap-y-5 pt-[65px] px-6">
        <h2 className='font-medium'>Appointment Results</h2>
        <InputTextArea
          label='Diagnosis & Repairs to be made'
          placeholder='Summarize what was the issue on the vehicle and the repairs to be made.'
        />
        <InputTextArea
          label='Repairs made'
          placeholder='Summarize what was done on the vehicle'
        />
      </div>
    </div>
  )
}

export default AppointmentExpandDetailsView

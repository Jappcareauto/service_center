import IMAGES from "@/assets/images"
import ClockIcon from "@/shared/generics/icons/ClockIcon"
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon"

const ChatCarComponent = () => {
  return (
    <div className="flex flex-col gap-y-3 max-w-[360px] w-full mb-4">
      <div className="w-full bg-white border border-borderColor p-4 pb-0 rounded-3xl">
        <h2 className="text-primary text-[22px] font-[300]">Porsche Taycan Turbo S</h2>
        <p className="text-sm">2024, RWD</p>
        <div className="flex justify-end">
          <img src={IMAGES.car} className="object-contain w-[220px]"/>
        </div>
      </div>
      <div className="border border-borderColor rounded-3xl flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-4 px-4">
          <div className="">
            <p className="text-grey4 text-sm">Service</p>
            <h2 className="text-primary font-medium">Body Shop Appointment</h2>
          </div>
          <div className="">
            <p className="text-grey4 text-sm">Estimated Inspection Fee</p>
            <h2 className="text-primary font-medium">5,000 Frs</h2>
          </div>
          <div className="">
            <p className="text-grey4 text-sm">Date</p>
            <div className="flex gap-x-4 items-center text-primary text-sm">
              <div className="flex items-center gap-x-2">
                <Calendar2Icon />
                <span>Monday, Oct 20, 2024</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ClockIcon />
                <span>Morning</span>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-grey4 text-sm">Note</p>
            <p className="text-sm">I would like to fix a dent in my front bumper</p>
          </div>

        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-grey4 text-sm pl-4">Pictures</p>
          <div className="flex flex-row overflow-x-auto w-full px-4">
            {
              [
                IMAGES.car2,
                IMAGES.car2,
                IMAGES.car2,
                IMAGES.car2,
              ].map((image, index) => {
                return <img
                  className="w-[100px] h-[100px] rounded-xl mr-2"
                  key={'image-' + index}
                  src={image} alt="" />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatCarComponent

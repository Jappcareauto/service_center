import IMAGES from "@/assets/images";
import Avatar from "@/shared/generics/Avatar";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import Expended2Icon from "@/shared/generics/menu/icons/Expended2Icon";
import LocationIcon from "@/shared/generics/menu/icons/LocationIcon";
import { RightModal } from "@/shared/generics/modals/RightModal";
import Tag from "@/shared/generics/Tag";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { useModal } from "@/shared/helpers/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AppointmentRoutes } from "../../infra/routes/Router";

const AppointmentDetailsView = () => {
  const modal = useModal({
    eventName: ModalEventKey.APPOINTMENT_DETAILS
  });
  const navigate = useNavigate();

  return (
    <RightModal
      isOpen={modal.isOpen}
      close={modal.close}
      className="pt-[65px] overflow-hidden"
    >
      <div className="w-full flex justify-between items-center px-6">
        <h2 className="font-medium">Appointment Details</h2>
        <Expended2Icon
          className="cursor-pointer"
          onClick={() => navigate(AppointmentRoutes.appointmentDetails)}
        />
      </div>
      <div className="h-[calc(100vh-190px)] overflow-y-auto">
        <div className="flex flex-col gap-y-5 px-6">
          <div className="">
            <h1 className="text-primary font-medium">Porsche Taycan Turbo S</h1>
            <p>2024, RWD</p>
          </div>
          <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4">
            <img src={IMAGES.car} alt="" />
          </div>
          <div className="flex justify-between items-center">
            <Avatar />
            <Tag />
          </div>
          <div className="">
            <h2 className="text-primary font-medium">Body shop appointment</h2>
            <div className="flex justify-between mt-4">
              <div className='flex flex-col gap-y-2'>
                <div className='flex items-center gap-x-1 text-grey4'>
                  <Calendar2Icon />
                  <p>Oct, 20, 2024 10am</p>
                </div>
                <div className='flex items-center gap-x-1 text-grey4'>
                  <LocationIcon />
                  <p>At Home</p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-y-2'>
                <p className='text-grey4'>Revenue</p>
                <h2 className="text-primary font-medium">5,000 Frs</h2>
              </div>
            </div>
          </div>
          <p>There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch, situated near the car's side profile. The dent is below the horizontal line of the rear headlight and sits closer to the lower third of the rear bumper.</p>
        </div>
        <div className="flex flex-col gap-y-3 mt-5">
          <h2 className="font-medium pl-6">Images</h2>
          <div className="flex flex-row overflow-x-auto w-full px-6">
            {
              [
                IMAGES.car2,
                IMAGES.car2,
                IMAGES.car2,
                IMAGES.car2,
              ].map((image, index) => {
                return <img
                  className="w-[112px] h-[112px] rounded-[20px] mr-2"
                  key={'image-' + index}
                  src={image} alt="" />
              })
            }
          </div>
        </div>
      </div>
      <div className="p-6">
        <PrimaryButton
          className="w-full"
        >
          Mark as completed
        </PrimaryButton>
      </div>
    </RightModal>
  )
}

export default AppointmentDetailsView

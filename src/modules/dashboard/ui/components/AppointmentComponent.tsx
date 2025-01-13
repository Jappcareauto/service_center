import IMAGES from "@/assets/images";
import { Appointment } from "@/modules/appointment/model/Appointment";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import LocationIcon from "@/shared/generics/menu/icons/LocationIcon";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { ModalEvents } from "@/shared/helpers/hooks/useModal";
import { FC } from "react";
import useAppointmentComponent from "./useAppointmentComponent";
interface AppointmentComponentProps {
  appointment: Appointment;
}
const AppointmentComponent: FC<AppointmentComponentProps> = ({
  appointment,
}) => {
  const { appointment: appointmentData, handleSectActiveAppointment } =
    useAppointmentComponent({
      appointment,
    });
  return (
    <div className="border border-borderColor rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-x-4 font-normal">
          <div className="rounded-full border-[2px] border-primary p-[1.5px]">
            <img src={IMAGES.avatar} alt="" className="w-12 h-12" />
          </div>
          <p>{appointmentData?.createdBy || "Anonyme"}</p>
        </div>
        <div
          className={
            "text-sm rounded-2xl px-3 py-2 bg-primaryAccent whitespace-nowrap text-primary"
          }
        >
          {appointmentData?.status}
        </div>
      </div>
      <h2 className="font-medium mt-3 text-primary">
        {/* Body shop appointment */}
        {appointmentData?.note}
      </h2>
      <h2 className="font-medium mt-1">
        {/* Porsche Taycan Turbo S */}
        {appointmentData.vehicle?.name}
      </h2>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-1 text-grey4">
            <Calendar2Icon />
            <p>{appointmentData.date}</p>
          </div>
          <div className="flex items-center gap-x-1 text-grey4">
            <LocationIcon />
            <p>{appointmentData.locationType}</p>
          </div>
        </div>
        <PrimaryButton
          onClick={() => {
            handleSectActiveAppointment(appointmentData.id);
            ModalEvents.open(ModalEventKey.APPOINTMENT_DETAILS);
          }}
          className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
        >
          See Details
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AppointmentComponent;

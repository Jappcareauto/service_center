import React from "react";

import Calendar2Icon from "../menu/icons/Calendar2Icon";
import LocationIcon from "../menu/icons/LocationIcon";
import PrimaryButton from "../buttons/PrimaryButton";
import { ModalEvents } from "@/hooks/useModal";
import { ModalEventKey } from "@/hooks/ModalEventKey";
import Avatar from "../Avatar";
import { IAppointment } from "@/types";
import { formatStatusText } from "@/utils/formatText";
import { format, parseISO } from 'date-fns';

interface AppointmentItemProps {
  appointment: IAppointment;
  onClick: (appointment: IAppointment) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({appointment, onClick}) => {
  function handleSelectActiveAppointment(appointment: IAppointment) {
    onClick(appointment);
  }

  const formatedStatus = formatStatusText(appointment.status);

  return (
    <div className="border border-borderColor rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-x-4 font-normal">
          <Avatar className="w-12 h-12" name={appointment?.user?.name||"Anonyme"} />
          {/* <p>{appointment?.user?.name || "Anonyme"}</p> */}
        </div>
        <div
          className={
            "text-sm rounded-2xl px-3 py-2 lowercase first-letter:uppercase bg-primaryAccent whitespace-nowrap text-primary"
          }
        >
          {formatedStatus}
        </div>
      </div>
      <h2 className="font-medium mt-3 text-primary">
        {/* Body shop appointment */}
        {appointment?.service?.title}
      </h2>
      <h2 className="font-medium mt-1">
        {/* Porsche Taycan Turbo S */}
        {appointment.vehicle?.name}
      </h2>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-1 text-grey4">
            <Calendar2Icon />
            <p>{format(parseISO(appointment.date), 'MMM dd, yyyy hh:mm a')}</p>
          </div>
          <div className="flex items-center gap-x-1 text-grey4">
            <LocationIcon />
            <p>{appointment.locationType}</p>
          </div>
        </div>
        <PrimaryButton
          onClick={() => {
            handleSelectActiveAppointment(appointment);

            ModalEvents.open(ModalEventKey.APPOINTMENT_DETAILS);
          }}
          className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
        >
          See Details
        </PrimaryButton>
      </div>
    </div>
  );
}

export default AppointmentItem;
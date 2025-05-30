import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { AppointmentStatus } from "@/enums";
import { getStatusStyles } from "@/utils";
import { formatStatusText } from "@/utils/formatStatusText";
import { formatDateTime } from "@/utils/getInitials";
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import { AppointmentType } from "./types";

const Appointment = ({
  status,
  service,
  vehicle,
  locationType,
  date,
  onDetail,
  className,
}: AppointmentType) => {
  return (
    <div
      className={twMerge(
        "border border-borderColor rounded-[20px] bg-white p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-x-4 font-normal">
          <div className="flex gap-x-2 items-center">
            <Avatar className="w-12 h-12" name={vehicle?.name} />
          </div>
        </div>
        <div
          className={twMerge(
            "text-sm rounded-2xl px-4 py-1 lowercase first-letter:uppercase whitespace-nowrap ",
            status
              ? getStatusStyles(status)
              : getStatusStyles(AppointmentStatus.NOT_STARTED)
          )}
        >
          {status
            ? formatStatusText(status)
            : formatStatusText(AppointmentStatus.NOT_STARTED)}
        </div>
      </div>
      <h2 className="font-medium mt-3 text-primary">{service?.title}</h2>
      <p className="mt-1">
        {vehicle?.detail?.year}, {vehicle?.detail?.model},{" "}
        {vehicle?.detail?.make}
      </p>
      {/* <p className="text-sm text-grey4">{note}</p> */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-2 text-grey4">
            <Calendar2Icon />
            <p className="text-sm">{date && formatDateTime(date)}</p>
          </div>
          <div className="flex items-center gap-x-2 text-grey4">
            <LocationIcon />
            <p className="text-sm">{locationType}</p>
          </div>
        </div>
        <Button
          onClick={onDetail}
          className="border border-black h-8 px-4 rounded-full font-normal bg-transparent text-black text-sm w-auto hover:bg-white"
          variant="primary"
        >
          See Details
        </Button>
      </div>
    </div>
  );
};

export default Appointment;

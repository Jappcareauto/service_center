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
  location,
  date,
  onDetail,
  className,
  active,
  onClick,
  isSmall,
}: AppointmentType) => {
  return (
    <div
  className={twMerge(
    "border border-borderColor rounded-[20px] bg-white p-4 w-full",
    active && "bg-primaryAccent shadow-lg border border-primaryAccent2",
    onClick && "cursor-pointer",
    "hover:shadow-md transition-all duration-500",
    className
  )}
  onClick={onClick}
>
  {/* Top Row: Avatar + Status */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div className="flex items-center gap-3 font-normal w-full">
      <Avatar className="w-12 h-12 shrink-0" name={vehicle?.name} />
    </div>
    <div
      className={twMerge(
        "text-xs sm:text-sm rounded-2xl px-3 py-1 lowercase first-letter:uppercase whitespace-nowrap self-start sm:self-auto",
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

  {/* Service & Vehicle Info */}
  <div className={twMerge("flex justify-between items-center flex-col sm:flex-row mt-3 sm:mt-4", isSmall && "mt-3")}>
    <div className="text-center sm:text-left">
      <h2 className={twMerge("font-medium text-primary", isSmall && "mt-3")}>
        {service?.title}
      </h2>
      <p className="mt-1 text-sm text-grey4">
        {vehicle?.year}, {vehicle?.model}, {vehicle?.make}
      </p>
    </div>

    {isSmall && (
      <Button
        onClick={onDetail}
        className="border border-black h-8 px-4 rounded-full font-normal bg-transparent text-black text-sm w-full sm:w-auto mt-3 sm:mt-0 hover:bg-white"
        variant="primary"
      >
        See Details
      </Button>
    )}
  </div>

  {/* Extra Info (desktop only if !isSmall) */}
  {!isSmall && (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-grey4">
        <div className="flex items-center gap-2">
          <Calendar2Icon />
          <p className="text-sm">{date && formatDateTime(date)}</p>
        </div>
        <div className="flex items-center gap-2">
          <LocationIcon />
          <p className="text-sm">{location?.name}</p>
        </div>
      </div>
      <Button
        onClick={onDetail}
        className="border border-black h-8 px-4 rounded-full font-normal bg-transparent text-black text-sm w-full sm:w-auto hover:bg-white"
        variant="primary"
      >
        See Details
      </Button>
    </div>
  )}
</div>

  );
};

export default Appointment;

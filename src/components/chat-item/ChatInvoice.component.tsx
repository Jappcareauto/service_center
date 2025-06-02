import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import images from "@/assets/images";
import { ClockIcon } from "@heroicons/react/24/solid";
import Button from "../button/Button.component";
import { Image } from "antd";
import { Appointment } from "@/types";
import { formatDateTime } from "@/utils/getInitials";

interface IProps extends Appointment {
  amount?: string;
  dueDate?: string;
  onView?: () => void;
}

const ChatInvoice = ({
  vehicle,
  service,
  amount,
  dueDate,
  onView,
  timeOfDay,
  note,
}: IProps) => {
  return (
    <div className="flex flex-col gap-y-2 max-w-[400px] w-full  border border-borderColor  bg-white p-3 px-5 rounded-xl">
      <div className="w-full bg-white pb-0 rounded-3xl">
        <h2 className="text-primary text-[22px] font-[300]">
          {vehicle?.detail?.make},{vehicle?.detail?.model}
        </h2>
        <p className="text-sm">{vehicle?.detail?.year}</p>
        <div className="flex justify-center">
          <Image
            src={
              vehicle?.media?.mainItemUrl
                ? vehicle?.media?.mainItemUrl
                : images.s2
            }
            className="object-contain"
            width={200}
          />
        </div>
      </div>
      <div className="border-t border-borderColor flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-4">
          <div className="">
            <p className="text-grey4 text-sm">Service</p>
            <h2 className="text-primary font-medium">{service?.title}</h2>
          </div>
          <div className="">
            <p className="text-grey4 text-sm">Estimated Inspection Fee</p>
            <h2 className="text-primary font-medium">{amount}</h2>
          </div>
          <div className="">
            <p className="text-grey4 text-sm mb-1">Date</p>
            <div className="flex gap-x-4 items-center text-primary text-sm">
              <div className="flex items-center gap-x-2">
                <Calendar2Icon />
                <span>Due: {dueDate && formatDateTime(dueDate)}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ClockIcon />
                <span>{timeOfDay}</span>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-grey4 text-sm">Note</p>
            <p className="text-sm">
              {note || "No additional notes provided for this appointment."}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-grey4 text-sm">Gallery</p>
          <div className="flex flex-row overflow-x-auto no-scrollbar w-full gap-x-2">
            {vehicle?.media?.items &&
              vehicle?.media?.items?.length > 0 &&
              vehicle?.media?.items.map((item) => {
                return (
                  <div key={item.fileId + item.sourceUrl}>
                    <Image
                      className="rounded-md border border-borderColor mb-3"
                      src={item.sourceUrl}
                      width={120}
                    />
                  </div>
                );
              })}
          </div>
          <Button className="text-sm mt-4" variant="tertiary" onClick={onView}>
            View Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInvoice;

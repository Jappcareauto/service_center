/* eslint-disable @typescript-eslint/no-explicit-any */
import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import images from "@/assets/images";
import { ClockIcon } from "@heroicons/react/24/solid";
import Button from "../button/Button.component";
import { Image } from "antd";
import { Appointment } from "@/types";
import { formatDateTime } from "@/utils/getInitials";
import LocationIcon from "@/assets/icons/LocationIcon";

interface IProps extends Appointment {
  amount?: string;
  dueDate?: string;
  onView?: () => void;
  onInvoice?: () => void;
  onInvoiceDetails?: () => void;
  hasInvoice?: boolean;
  location: any;
  description: any;
}

const ChatInvoice = ({
  vehicle,
  service,
  amount,
  dueDate,
  onView,
  onInvoice,
  onInvoiceDetails,
  timeOfDay,
  note,
  description,
  location,
  hasInvoice,
}: IProps) => {
  return (
    <div className="flex flex-col gap-y-2 max-w-[400px] w-full  border border-borderColor  bg-white p-3 px-5 rounded-xl">
      <div className="w-full bg-white pb-0 rounded-3xl">
        {vehicle?.make && (
          <h2 className="text-primary text-[22px] font-[300]">
            {vehicle?.make},{vehicle?.model}
          </h2>
        )}
        {vehicle?.year && <p className="text-sm">{vehicle?.year}</p>}
        <div className="flex justify-center">
          <Image
            src={vehicle?.imageUrl ? vehicle?.imageUrl : images.s2}
            className="object-contain"
            width={200}
          />
        </div>
      </div>
      <div className="border-t border-borderColor flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-4">
          {service?.title && (
            <div className="">
              <p className="text-grey4 text-sm">Service</p>
              <h2 className="text-primary font-medium">{service?.title}</h2>
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2 text-grey4">
              <LocationIcon />
              <div>
                <p>{location}</p>
                <p className=" text-gray-500 mt-1">{description}</p>
              </div>
            </div>
          </div>
          {amount && (
            <div className="">
              <p className="text-grey4 text-sm">Estimated Inspection Fee</p>
              <h2 className="text-primary font-medium">{amount}</h2>
            </div>
          )}

          <div>
            {dueDate && <p className="text-grey4 text-sm mb-1">Due Date</p>}
            <div className="flex gap-x-4 items-center text-primary text-sm">
              {dueDate && (
                <div className="flex items-center gap-x-2">
                  <Calendar2Icon />
                  <span>Due: {dueDate && formatDateTime(dueDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-x-2">
                <ClockIcon />
                <span>{timeOfDay}</span>
              </div>
            </div>
          </div>
          {note && (
            <div className="">
              <p className="text-grey4 text-sm">Note</p>
              <p className="text-sm">
                {note || "No additional notes provided for this appointment."}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {/* {vehicle?.media?.items && vehicle?.media?.items?.length > 0 && (
            <>
              <p className="text-grey4 text-sm">Gallery</p>
              <div className="flex flex-row overflow-x-auto no-scrollbar w-full gap-x-2">
                {vehicle?.media?.items.map((item) => {
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
            </>
          )} */}
          <div className="flex justify-between mt-4">
            <Button className="text-sm" variant="tertiary" onClick={onView}>
              View Details
            </Button>
            {hasInvoice ? (
              <Button className="text-sm" onClick={onInvoiceDetails}>
                Invoice Details
              </Button>
            ) : (
              <Button className="text-sm" onClick={onInvoice}>
                Create Invoice
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInvoice;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { VehicleMediaItem } from "@/types";
import {
  formatDateTime,
  formatStatusText,
  getInitials,
} from "@/utils/getInitials";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import { AppointmentDetailModalProps } from "./types";
import NoData from "../no-data/NoData.component";
import { getButtonLabel, getStatusStyles } from "@/utils";
import { AppointmentStatus } from "@/enums";
import { twMerge } from "tailwind-merge";
import { Image } from "antd";

const AppointmentDetailModal = ({
  vehicle,
  status,
  date,
  service,
  locationType,
  isLoading,
  isComplete,
  onClick,
  timeOfDay,
}: AppointmentDetailModalProps | any) => {
  return (
    <>
      <div className="pb-16">
        <div className="flex flex-col gap-y-5">
          <div className="">
            <h1 className="text-primary font-medium">
              {/* Porsche Taycan Turbo S */}
              {vehicle?.name}
            </h1>
            <p>
              {/* 2024, RWD */}
              {vehicle?.detail?.model}
            </p>
          </div>
          {vehicle?.media?.mainItemUrl && (
            <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4">
              {/* vehicle image */}
              <Image src={vehicle?.media?.mainItemUrl} alt={vehicle?.name} />
            </div>
          )}
          <div className="flex justify-between items-center">
            <Avatar name={vehicle?.name && getInitials(vehicle?.name)} />
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
          <div className="">
            <h2 className="text-primary font-medium">
              {/* Body shop appointment */}
              {service?.title}
            </h2>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-x-2 text-grey4">
                  <Calendar2Icon />
                  <p>
                    {/* Oct, 20, 2024 10am */}
                    {date && formatDateTime(date)}
                  </p>
                </div>
                <div className="flex items-center gap-x-2 text-grey4">
                  <LocationIcon />
                  <p>
                    {/* At Home */}
                    {locationType}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <p className="text-grey4">Time of Day</p>
                <h2 className="text-primary font-medium">{timeOfDay}</h2>
              </div>
            </div>
          </div>
          <p>{vehicle?.description}</p>
        </div>
        {vehicle?.media?.items?.length > 0 && (
          <div className="flex flex-col gap-y-3 mt-2">
            <h2 className="font-medium">Images</h2>
            <div className="flex flex-row overflow-x-auto w-full gap-x-5">
              {vehicle?.media && vehicle?.media?.items?.length > 0 ? (
                vehicle?.media?.items?.map((image: VehicleMediaItem) => {
                  return (
                    <div key={image.fileId + image.sourceUrl}>
                      <Image
                        className="rounded-[20px] border border-borderColor mb-3"
                        src={image.sourceUrl}
                        width={200}
                      />
                    </div>
                  );
                })
              ) : (
                <NoData />
              )}
            </div>
          </div>
        )}
        <div className="w-full mt-8 absolute bottom-0 bg-white py-3 flex">
          <Button
            disabled={isLoading ?? status === AppointmentStatus.COMPLETED}
            isLoading={isLoading}
            className={`w-[90%] ${
              isComplete &&
              "bg-primaryAccent border text-primary border-primaryAccent2"
            } `}
            onClick={onClick}
          >
            {status ? getButtonLabel(status) : "Mark as in progress"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetailModal;

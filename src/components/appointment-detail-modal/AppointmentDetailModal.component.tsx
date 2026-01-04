import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { AppointmentStatus, ToastType } from "@/enums";
import { VehicleMediaItem } from "@/types";
import { getStatusStyles } from "@/utils";
import {
  formatDateTime,
  formatStatusText,
  getInitials,
} from "@/utils/getInitials";
import { Image } from "antd";
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import NoData from "../no-data/NoData.component";
import { AppointmentDetailModalProps } from "./types";
import { useToast } from "@/context/ToastContext";
import {
  useAcceptAppointmentMutation,
  useCompleteAppointmentMutation,
  useDeclineAppointmentMutation,
  // useUpdateAppointmentStatusMutation,
} from "@/redux/api";
import { useCallback } from "react";

const AppointmentDetailModal = ({
  vehicle,
  status,
  date,
  service,
  locationType,
  timeOfDay,
  id,
}: AppointmentDetailModalProps) => {
  const { toast } = useToast();

  const [acceptAppointment, { isLoading: acceptLoading }] =
    useAcceptAppointmentMutation();
  const [declineAppointment, { isLoading: declineLoading }] =
    useDeclineAppointmentMutation();
  const [completeAppointment, { isLoading: completeLoading }] =
    useCompleteAppointmentMutation();
  // const [updateAppointment, { isLoading: updateLoading }] =
  //   useUpdateAppointmentStatusMutation();

  const handleAcceptAppointment = useCallback(() => {
    if (!id) return;
    acceptAppointment(id as string)
      .unwrap()
      .then((res) => {
        toast(
          ToastType.SUCCESS,
          res?.meta?.message ?? "Appointment Accepted Successully"
        );
      })
      .catch((err) => {
        console.error("myerr", err);
        if (err?.data?.errors) {
          toast(ToastType.ERROR, err?.data?.errors);
          return;
        }
        toast(ToastType.ERROR, "Oops an error occcured!");
      });
  }, [id, acceptAppointment]);

  const handleDeclineAppointment = useCallback(() => {
    if (!id) return;
    declineAppointment(id as string)
      .unwrap()
      .then((res) => {
        toast(
          ToastType.SUCCESS,
          res?.meta?.message ?? "Appointment Declined Successully"
        );
      })
      .catch((err) => {
        console.error("myerr", err);

        if (err?.data?.errors) {
          toast(ToastType.ERROR, err?.data?.errors);
          return;
        }
        toast(ToastType.ERROR, "Oops an error occcured!");
      });
  }, [id, declineAppointment]);

  const handleCompleteAppointment = useCallback(() => {
    if (!id) return;
    completeAppointment(id as string)
      .unwrap()
      .then((res) => {
        toast(
          ToastType.SUCCESS,
          res?.meta?.message ?? "Appointment Completed Successfully"
        );
      })
      .catch((err) => {
        console.error("myerr", err);
        if (err?.data?.errors) {
          toast(ToastType.ERROR, err?.data?.errors);
          return;
        }
        toast(ToastType.ERROR, "Oops an error occurred!");
      });
  }, [id, completeAppointment]);

  // const handleUpdateStatus = useCallback(() => {
  //   if (!id) return;
  //   const data = {
  //     status: AppointmentStatus.NOT_STARTED,
  //     id: id as string,
  //   };
  //   updateAppointment(data)
  //     .unwrap()
  //     .then((res) => {
  //       toast(
  //         ToastType.SUCCESS,
  //         res?.meta?.message ?? "Appointment Status Updated Successfully"
  //       );
  //     })
  //     .catch((err) => {
  //       console.error("myerr", err);
  //       if (err?.data?.errors) {
  //         toast(ToastType.ERROR, err?.data?.errors);
  //         return;
  //       }
  //       toast(ToastType.ERROR, "Oops an error occurred!");
  //     });
  // }, [id, updateAppointment]);

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
            <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full p-2">
              {/* vehicle image */}
              <Image
                src={vehicle?.media?.mainItemUrl}
                alt={vehicle?.name}
                height={200}
              />
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
        {vehicle?.media?.items && vehicle?.media?.items?.length > 0 && (
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
        <div className="w-[90%] mt-10 absolute bottom-0 bg-white py-4 pt-9 flex flex-col md:flex-row justify-between box-border">
          <div className="flex flex-col md:flex-row space-y-3 mb-3 md:space-x-4 md:space-y-0 md:mb-0">
            <Button
              disabled={
                acceptLoading ||
                status === AppointmentStatus.COMPLETED ||
                status === AppointmentStatus.IN_PROGRESS
              }
              isLoading={acceptLoading}
              onClick={handleAcceptAppointment}
            >
              {"Accept"}
            </Button>
            <Button
              disabled={
                declineLoading || status === AppointmentStatus.COMPLETED
              }
              isLoading={declineLoading}
              className={
                "bg-red-50 border text-red-500 border-red-500 hover:bg-white"
              }
              onClick={handleDeclineAppointment}
            >
              {"Cancel"}
            </Button>
            {/* <Button
              isLoading={updateLoading}
              className={
                "bg-yellow-50 border text-yellow-500 border-yellow-500 hover:bg-white"
              }
              onClick={handleUpdateStatus}
            >
              {"Update Status"}
            </Button> */}
          </div>
          <Button
            disabled={
              completeLoading ||
              status === AppointmentStatus.IN_PROGRESS ||
              status === AppointmentStatus.NOT_STARTED ||
              status === AppointmentStatus.CANCELLED
            }
            isLoading={completeLoading}
            onClick={handleCompleteAppointment}
            variant="secondary"
          >
            {"Mark Complete"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetailModal;

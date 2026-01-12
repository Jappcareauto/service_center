import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { useToast } from "@/context/ToastContext";
import { AppointmentStatus, ToastType } from "@/enums";
import {
  useAcceptAppointmentMutation,
  useCompleteAppointmentMutation,
  useDeclineAppointmentMutation,
} from "@/redux/api";
import { getStatusStyles } from "@/utils";
import {
  formatDateTime,
  formatStatusText,
  getInitials,
} from "@/utils/getInitials";
import { Divider, Image } from "antd";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import { AppointmentDetailModalProps } from "./types";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Expended2Icon from "@/assets/icons/Expended2Icon";
import { useNavigate } from "react-router-dom";

const AppointmentDetailModal = ({
  vehicle,
  status,
  date,
  service,
  locationType,
  serviceCenter,
  id,
  note,
}: AppointmentDetailModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
  }, [id, acceptAppointment, toast]);

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
  }, [id, declineAppointment, toast]);

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
  }, [id, completeAppointment, toast]);
  return (
    <>
      <div className="pb-16">
        <div className="flex flex-col gap-y-5 pb-4">
          <div className="">
            <h1 className="text-primary font-medium">
              {/* Porsche Taycan Turbo S */}
              {vehicle?.name}
            </h1>
            <p>
              {/* 2024, RWD */}
              {vehicle?.model}
            </p>
          </div>
          {vehicle?.imageUrl && (
            <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full p-2">
              {/* vehicle image */}
              <Image src={vehicle?.imageUrl} alt={vehicle?.name} height={200} />
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
              <div className="flex flex-col gap-y-2 items-end">
                <p className="text-grey4 textr">service Center</p>
                <h2 className="text-primary font-medium">
                  {serviceCenter?.name}
                </h2>
              </div>
            </div>
          </div>
          <Divider className="my-0" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <ExclamationCircleIcon className="w-5 h-5 text-gray-400" />
              <p className=" text-gray-500">{note}</p>
            </div>
            <button
              className="flex space-x-3 hover:text-primary transition-all duration-200"
              onClick={() => id && navigate(`/appointment/${id}`)}
              type='button'
            >
              <p className="text-[0.9rem]">View Details</p>
              <Expended2Icon className="cursor-pointer" />
            </button>
          </div>
        </div>
        {/* {vehicle?.media?.items && vehicle?.media?.items?.length > 0 && (
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
        )} */}
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

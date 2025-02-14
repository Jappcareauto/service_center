// import IMAGES from "@/assets/images";
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
// import useAppointementDetail from "./useAppointementDetail";
import Loader from "@/shared/generics/loader/Loader";
import { LoadingState } from "@/shared/enums/LoadingState";
import { FC } from "react";
import { Appointment } from "../../model/Appointment";
import { formatDateToMedium } from "@/shared/utils/dateFormat";
import { useUpdateAppointmentStatus } from "../../useCase/update/status/useUpdateAppointmentStatus";
import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";
type Props = {
  loading: LoadingState;
  appointment: Appointment;
};
const AppointmentDetailsView: FC<Props> = ({ appointment, loading }) => {
  const modal = useModal({
    eventName: ModalEventKey.APPOINTMENT_DETAILS,
  });
  const {
    action,
    state: { loading: updateStatus },
  } = useUpdateAppointmentStatus();
  const navigate = useNavigate();
  // const {} = useAppointementDetail();
  let content = <></>;
  console.log("appointment", appointment.user?.name);
  switch (loading) {
    case LoadingState.pending:
      content = (
        <>
          <div className="flex w-full justify-center -mt-7">
            <Loader />
          </div>

          <div className="w-full flex justify-between items-center px-6">
            <h2 className="font-medium">Appointment Details</h2>
            <Expended2Icon
              className="cursor-pointer"
              onClick={() => navigate(AppointmentRoutes.appointmentDetails())}
            />
          </div>
          <div className="h-[calc(100vh-190px)] overflow-y-auto">
            <div className="flex flex-col gap-y-5 px-6">
              <div className="">
                <h1 className="text-primary font-medium">
                  {/* Porsche Taycan Turbo S */}
                  {appointment?.vehicle?.name}
                </h1>
                <p>
                  {/* 2024, RWD */}
                  {appointment?.vehicle?.detail?.model}
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4">
                {/* vehicle image */}
                <img
                  src={appointment?.vehicle?.imageUrl}
                  alt={appointment?.vehicle?.name}
                />
              </div>
              <div className="flex justify-between  items-center">
                <Avatar name={appointment.user?.name} />
                <Tag tagText={appointment?.status} />
              </div>
              <div className="">
                <h2 className="text-primary font-medium">
                  {/* Body shop appointment */}
                </h2>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-1 text-grey4">
                      <Calendar2Icon />
                      <p>
                        {/* Oct, 20, 2024 10am */}
                        {formatDateToMedium(appointment.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 text-grey4">
                      <LocationIcon />
                      <p>
                        {/* At Home */}
                        {appointment.locationType}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-grey4">Revenue</p>
                    <h2 className="text-primary font-medium">5,000 Frs</h2>
                  </div>
                </div>
              </div>
              <p>{appointment.vehicle?.description}</p>
            </div>
            <div className="flex flex-col gap-y-3 mt-5">
              <h2 className="font-medium pl-6">Images</h2>
              <div className="flex flex-row overflow-x-auto w-full px-6">
                {appointment.vehicle?.media?.items.map((image, index) => {
                  return (
                    <img
                      className="w-[112px] h-[112px] rounded-[20px] mr-2"
                      key={"image-" + index}
                      src={image.sourceUrl}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-6">
            <PrimaryButton
              disabled={
                updateStatus === LoadingState.pending ||
                appointment.status === AppointmentFilter.COMPLETED
              }
              className={`w-full ${
                appointment.status === AppointmentFilter.COMPLETED &&
                "bg-primaryAccent border text-primary border-primaryAccent2"
              } `}
              onClick={() =>
                action.onUpdateStatus({
                  id: appointment.id,
                  status: {
                    status: AppointmentFilter.COMPLETED,
                  },
                })
              }
            >
              {updateStatus === LoadingState.pending ? (
                <div className="flex w-full justify-center">
                  <Loader />
                </div>
              ) : appointment.status === AppointmentFilter.COMPLETED ? (
                "Completed"
              ) : (
                " Mark as completed"
              )}
            </PrimaryButton>
          </div>
        </>
      );
      break;
    case LoadingState.failed:
      content = (
        <div className="flex w-full justify-center mt-20">
          <p>We couldn't load the data. Please try again later.</p>
        </div>
      );
      break;
    default:
      content = (
        <>
          <div className="w-full flex justify-between items-center px-6">
            <h2 className="font-medium">Appointment Details</h2>
            <Expended2Icon
              className="cursor-pointer"
              onClick={() =>
                navigate(AppointmentRoutes.appointmentDetails(), {
                  state: {
                    appointmentId: appointment?.id,
                  },
                })
              }
            />
          </div>
          <div className="h-[calc(100vh-190px)] overflow-y-auto">
            <div className="flex flex-col gap-y-5 px-6">
              <div className="">
                <h1 className="text-primary font-medium">
                  {/* Porsche Taycan Turbo S */}
                  {appointment?.vehicle?.name}
                </h1>
                <p>
                  {/* 2024, RWD */}
                  {appointment.vehicle?.detail?.model}
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4">
                {/* vehicle image */}
                <img
                  src={appointment.vehicle?.imageUrl}
                  alt={appointment.vehicle?.name}
                />
              </div>
              <div className="flex justify-between items-center">
                <Avatar name={appointment.user?.name} />
                <Tag tagText={appointment?.status} />
              </div>
              <div className="">
                <h2 className="text-primary font-medium">
                  {/* Body shop appointment */}
                  {appointment.service?.title}
                </h2>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-1 text-grey4">
                      <Calendar2Icon />
                      <p>
                        {/* Oct, 20, 2024 10am */}
                        {formatDateToMedium(appointment.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 text-grey4">
                      <LocationIcon />
                      <p>
                        {/* At Home */}
                        {appointment.locationType}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-grey4">Revenue</p>
                    <h2 className="text-primary font-medium">5,000 Frs</h2>
                  </div>
                </div>
              </div>
              <p>{appointment.vehicle?.description}</p>
            </div>
            <div className="flex flex-col gap-y-3 mt-5">
              <h2 className="font-medium pl-6">Images</h2>
              <div className="flex flex-row overflow-x-auto w-full px-6">
                {appointment.vehicle?.media?.items.map((image, index) => {
                  return (
                    <img
                      className="w-[112px] h-[112px] rounded-[20px] mr-2"
                      key={"image-" + index}
                      src={image.sourceUrl}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-6">
            <PrimaryButton
              disabled={
                updateStatus === LoadingState.pending ||
                appointment.status === AppointmentFilter.COMPLETED
              }
              className={`w-full ${
                appointment.status === AppointmentFilter.COMPLETED &&
                "bg-primaryAccent border text-primary border-primaryAccent2"
              } `}
              onClick={() =>
                action.onUpdateStatus({
                  id: appointment.id,
                  status: {
                    status: AppointmentFilter.COMPLETED,
                  },
                })
              }
            >
              {updateStatus === LoadingState.pending ? (
                <div className="flex w-full justify-center">
                  <Loader />
                </div>
              ) : appointment.status === AppointmentFilter.COMPLETED ? (
                "Completed"
              ) : (
                " Mark as completed"
              )}
            </PrimaryButton>
          </div>
        </>
      );
      break;
  }

  return (
    <RightModal
      isOpen={modal.isOpen}
      close={modal.close}
      className="pt-[65px] overflow-hidden"
    >
      {content}
    </RightModal>
  );
};

export default AppointmentDetailsView;

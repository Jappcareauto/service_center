import Avatar from "@/components/Avatar";
import Calendar2Icon from "@/components/menu/icons/Calendar2Icon";
import Expended2Icon from "@/components/menu/icons/Expended2Icon";
import LocationIcon from "@/components/menu/icons/LocationIcon";
import { RightModal } from "@/components/modals/RightModal";
import Tag from "@/components/Tag";
import { ModalEventKey } from "@/hooks/ModalEventKey";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AppointmentRoutes } from "@/routes/Navigation";
import { FC, use, useEffect, useState } from "react";
import { IAppointment } from "@/types";
import { formatDateToMedium } from "@/utils/dateFormat";
import { on } from "events";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { LoadingState } from "@/enums/LoadingState";
import { AppointmentFilter } from "@/enums/AppointmentFIlter";
import { Loader } from "lucide-react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

type Props = {
  appointment: IAppointment;
};

const AppointmentDetailsView: FC<Props> = ({ appointment }) => {
  const modal = useModal({
    eventName: ModalEventKey.APPOINTMENT_DETAILS,
  });
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = appointment.vehicle?.media?.items?.map(item => ({
    original: item.sourceUrl,
    thumbnail: item.sourceUrl,
  })) || [];

  const thumbnailImages = appointment.vehicle?.media?.items || [];


  const updateStatus = (status: string) => {
    console.log(status);
    setLoadingStatus(false);
  };

  useEffect(() => {
    console.log("Appointment details page opened");
    if (modal.isOpen) {
      setLoadingStatus(false);
    }
  }
    , [modal.isOpen]);


  return (
    <RightModal
      isOpen={modal.isOpen}
      close={modal.close}
      className="pt-[65px] overflow-hidden"
    >

      {/* Image Gallery Modal */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50"
            onClick={() => setIsViewerOpen(false)}
          >
            ✕
          </button>
          <div className="w-full max-w-4xl">
            <ImageGallery
              items={galleryImages}
              startIndex={currentIndex}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              lazyLoad={true}
              additionalClass="image-gallery-custom"
            />
          </div>
        </div>
      )}

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
              {appointment?.vehicle?.name}
            </h1>
            <p>
              {appointment.vehicle?.detail?.model}
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4">
            <img
              src={appointment.vehicle?.media?.mainItemUrl ?? undefined}
              alt={appointment.vehicle?.name}
            />
          </div>
          <div className="flex justify-between items-center">
            <Avatar name={appointment.user?.name} />
            <Tag tagText={appointment?.status} />
          </div>
          <div className="">
            <h2 className="text-primary font-medium">
              {appointment.service?.title}
            </h2>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-1 text-grey4">
                  <Calendar2Icon />
                  <p>
                    {formatDateToMedium(appointment.date)}
                  </p>
                </div>
                <div className="flex items-center gap-x-1 text-grey4">
                  <LocationIcon />
                  <p>
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
            {thumbnailImages.map((image, index) => (
              <img
                className="w-[112px] h-[112px] rounded-[20px] mr-2 cursor-pointer"
                key={"image-" + index}
                src={image.sourceUrl}
                alt=""
                onClick={() => {
                  setCurrentIndex(index);
                  setIsViewerOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Uncomment if you need the PrimaryButton */}
        <PrimaryButton
          disabled={
            loadingStatus === true ||
            appointment.status === "COMPLETED"
          }
          className={`w-full ${appointment.status === AppointmentFilter.COMPLETED &&
            "bg-primaryAccent border text-primary border-primaryAccent2"
            } `}
          onClick={() => updateStatus(AppointmentFilter.COMPLETED)}
        >
          {loadingStatus ? (
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
    </RightModal>
  );
};

export default AppointmentDetailsView;
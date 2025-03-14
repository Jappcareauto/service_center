import Avatar from "@/shared/generics/Avatar";
import InputTextArea from "@/shared/generics/inputs/InputTextArea";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import LocationIcon from "@/shared/generics/menu/icons/LocationIcon";
import Tag from "@/shared/generics/Tag";
import useAppointementDetail from "./useAppointementDetail";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import { InvoiceRoutes } from "@/modules/Invoice.ts/infra/routes/Router";

const AppointmentExpandDetailsView = () => {
  const {
    state: { activeAppointment },
    action,
  } = useAppointementDetail();
  return (
    <div className="grid grid-cols-[auto_360px] gap-x-32">
      <div>
        <h2 className="font-medium">Appointment Details</h2>
        <div className="mt-10 flex flex-col gap-y-6">
          <div className="flex justify-between items-center">
            <Avatar name={activeAppointment.user?.name} />
            <Tag tagText={activeAppointment.status} />
          </div>
          <div>
            <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-full min-h-[190px] p-4 max-w-[355px]">
              <img
                src={activeAppointment.vehicle?.imageUrl}
                alt={activeAppointment.vehicle?.name}
                className="rounded-lg"
              />
            </div>
            <h1 className="font-medium mt-2">
              {/* Porsche Taycan Turbo S */}
              {activeAppointment.vehicle?.name}
            </h1>
            <p className="">
              {/* 2024, RWD */}
              {activeAppointment.vehicle?.detail?.model}
            </p>
          </div>

          <div className="">
            <h2 className="text-primary font-medium -mt-4">
              {/* Body shop appointment */}
              {activeAppointment.service?.title}
            </h2>
            <div className="flex flex-col gap-y-2 mt-2">
              <div className="flex items-center gap-x-1 text-grey4">
                <Calendar2Icon />

                <p>
                  {/* Oct, 20, 2024 10am */}
                  {activeAppointment?.date}
                </p>
              </div>
              <div className="flex items-center gap-x-1 text-grey4">
                <LocationIcon />
                <p>
                  {/* At Home */}
                  {activeAppointment.locationType}
                </p>
              </div>
            </div>
          </div>
          <p>
            {/* There is a noticeable dent on the rear bumper of my Porsche Taycan,
            specifically located between the lower edge of the rear headlight
            and the rear wheel arch. It is closer to the wheel arch, situated
            near the car's side profile. The dent is below the horizontal line
            of the rear headlight and sits closer to the lower third of the rear
            bumper. */}
            {activeAppointment.vehicle?.description}
          </p>
          <div className="flex flex-col gap-y-3 ">
            <h2 className="font-medium">Images</h2>
            <div className="flex flex-row overflow-x-auto w-full">
              {activeAppointment.vehicle?.media?.items?.map((image, index) => {
                return (
                  <img
                    className="w-[140px] h-[140px] object-cover rounded-[20px] mr-2"
                    key={"image-" + index}
                    src={image.sourceUrl}
                    alt="image"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0 h-screen bg-background w-[420px] shadow-lg flex flex-col gap-y-5 pt-[65px] px-6">
        <h2 className="font-medium">Appointment Results</h2>
        <InputTextArea
          label="Diagnosis & Repairs to be made"
          placeholder="Summarize what was the issue on the vehicle and the repairs to be made."
        />
        <InputTextArea
          label="Repairs made"
          placeholder="Summarize what was done on the vehicle"
        />
        <div className="flex flex-col ">
          <h3>Invoice</h3>
          <div className="self-end">
            <PrimaryButton
              onClick={() =>
                action.handleNavigation(
                  InvoiceRoutes.createInvoice(activeAppointment?.id)
                )
              }
              className="bg-inherit text-black border-black border font-normal hover:text-white hover:bg-primary rounded-full hover:border-primary duration-200 "
            >
              Create Invoice
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentExpandDetailsView;

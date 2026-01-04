import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import Invoice from "@/components/invoice/Invoice.component";
import NoData from "@/components/no-data/NoData.component";
import { useToast } from "@/context/ToastContext";
import { AppointmentStatus, ToastType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDiagnosisMadeMutation,
  useDiagnosisToMakeMutation,
  useGetAppointmentQuery,
  useGetInvoiceByAppointmentQuery,
  useGetServiceQuery,
  useGetUserQuery,
} from "@/redux/api";
import {
  setAppointment,
  setAppointmentId,
  setInvoice,
} from "@/redux/features/appointment/appointmentSlice";
import { setChatroomId } from "@/redux/features/chat/chatSlice";
import { useAppDispatch } from "@/redux/store";
import { Appointment, VehicleMediaItem } from "@/types";
import { getStatusStyles } from "@/utils";
import { formatStatusText } from "@/utils/formatStatusText";
import { formatDateTime } from "@/utils/getInitials";
import {
  ChevronLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Image, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const AppointmentDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAppointmentQuery(id as string, {
    skip: !id,
  });
  const { data: invoice, isLoading: invoiceLoading } =
    useGetInvoiceByAppointmentQuery(data?.data?.id as string);
  const { data: user } = useGetUserQuery(data?.data?.createdBy as string, {
    skip: !data?.data?.createdBy,
  });
  const { data: service } = useGetServiceQuery(
    invoice?.data?.serviceId as string,
    {
      skip: !invoice?.data?.serviceId,
    }
  );

  const [onDiagnosisToMake, { isLoading: diagnosisToMakeLoading }] =
    useDiagnosisToMakeMutation();
  const [onDiagnosisMade, { isLoading: diagnosisMadeLoading }] =
    useDiagnosisMadeMutation();

  const [diagnosisToMake, setDiagnosisToMake] = useState(
    data?.data?.diagnosesToMake || ""
  );
  const [diagnosisMade, setDiagnosisMade] = useState(
    data?.data?.diagnosesMade || ""
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (invoice?.data) {
      dispatch(setInvoice(invoice?.data));
    }
    if (data?.data) {
      dispatch(setAppointment(data?.data));
    }
    if(data?.data?.diagnosesMade) {
      setDiagnosisMade(data?.data?.diagnosesMade)
    }
    if(data?.data?.diagnosesToMake) {
      setDiagnosisToMake(data?.data?.diagnosesToMake)
    }
  }, [invoice, data]);

  const handleDiagnosisToMake = () => {
    if (diagnosisToMake.trim() === "") return;
    const data = {
      diagnosesToMake: diagnosisToMake,
      id: id as string,
    };
    onDiagnosisToMake(data)
      .unwrap()
      .then(() => {
        setDiagnosisToMake("");
        toast(ToastType.SUCCESS, "Diagnosis to make updated successfully");
      })
      .catch((error) => {
        console.error("Error updating diagnosis to make:", error);
        toast(ToastType.ERROR, "Error updating diagnosis to make:");
      });
  };

  const handleDiagnosisMade = () => {
    if (diagnosisMade.trim() === "") return;
    const data = {
      diagnosesMade: diagnosisMade,
      id: id as string,
    };
    onDiagnosisMade(data)
      .unwrap()
      .then(() => {
        setDiagnosisMade("");
        toast(ToastType.SUCCESS, "Diagnosis made updated successfully");
      })
      .catch((error) => {
        console.error("Error updating diagnosis made:", error);
        toast(ToastType.ERROR, "Error updating diagnosis made:");
      });
  };

  console.log('data?.data', data?.data?.chatRoom)

  return (
    <DashboardLayout>
      <div className="pb-16">
        <button
          className="flex gap-x-1 items-center mb-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          <p className="font-semibold text-gray-600">Appointment Details</p>
        </button>
        <div className="flex">
          <div className="flex flex-col gap-y-3 w-[76%] pr-20">
            <div className="flex justify-between items-center mb-4">
              <Avatar
                name={(user?.data?.name as string) ?? data?.data?.vehicle?.name}
                isName
              />
              <div className="flex space-x-5">
                <div
                  className={twMerge(
                    "text-sm rounded-2xl px-3 first-letter:uppercase lowercase py-2 bg-primaryAccent whitespace-nowrap text-primary",
                    data?.data?.status
                      ? getStatusStyles(data?.data?.status)
                      : getStatusStyles(AppointmentStatus.NOT_STARTED)
                  )}
                >
                  {data?.data?.status &&
                    formatStatusText(data?.data?.status as AppointmentStatus)}
                </div>
                <Button
                  className="rounded-full w-auto h-[38px] text-sm"
                  variant="secondary"
                  onClick={() => {
                    navigate(`/chat/${id}`);
                    dispatch(setAppointmentId(data?.data?.id as string));
                    dispatch(setChatroomId(data?.data?.chatRoom?.id as string));
                  }}
                >
                  Chat now!
                </Button>
              </div>
            </div>

            {data?.data?.vehicle?.media?.mainItemUrl && (
              <div className="rounded-2xl bg-white border border-borderColor flex items-center justify-center w-[50%] min-h-[190px] p-2">
                <Image
                  src={data?.data?.vehicle?.media?.mainItemUrl}
                  alt={data?.data?.vehicle?.name}
                />
              </div>
            )}
            <div className="">
              <h1 className="font-medium">{data?.data?.vehicle?.name}</h1>
              <p className="my-1">
                {data?.data?.vehicle?.detail?.year},{" "}
                {data?.data?.vehicle?.detail?.model},{" "}
                {data?.data?.vehicle?.detail?.make}
              </p>
              <p className="text-gray-500">
                {data?.data?.vehicle?.description}
              </p>
            </div>
            <div className="">
              <div className="flex">
                {/* <p className='text-gray-500 mr-2'>Service: </p> */}
                <h2 className="text-primary font-medium mt-0">
                  {data?.data?.service?.title}
                </h2>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-2 text-grey4">
                    <Calendar2Icon />
                    <p>
                      {/* Oct, 20, 2024 10am */}
                      {data?.data?.date &&
                        formatDateTime(data?.data?.date as string)}
                    </p>
                  </div>
                  <div className="flex gap-x-2 text-grey4">
                    <LocationIcon />
                    <div>
                      <p>{data?.data?.location?.name}</p>
                      <p className=" text-gray-500 mt-1">
                        {data?.data?.serviceCenter?.location?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-y-2">
                  <p className="text-grey4">Time of Day</p>
                  <h2 className="text-primary font-medium">
                    {data?.data?.timeOfDay}
                  </h2>
                </div>
              </div>
              <div className="flex space-x-2 items-center mt-3">
                <ExclamationCircleIcon className="w-5 h-5 text-gray-400" />
                <p className=" text-gray-500">{data?.data?.note}</p>
              </div>
            </div>
            {data?.data?.vehicle?.media &&
              data?.data?.vehicle?.media?.items?.length > 0 && (
                <div className="flex flex-col gap-y-3 mt-2">
                  <h2 className="font-medium">Images</h2>
                  <div className="flex flex-row w-full gap-5 flex-wrap">
                    {data?.data?.vehicle?.media?.items?.length > 0 ? (
                      data?.data?.vehicle?.media?.items?.map(
                        (image: VehicleMediaItem) => {
                          return (
                            <div key={image.fileId + image.sourceUrl}>
                              <Image
                                className="rounded-[20px] border border-borderColor mb-3"
                                src={image.sourceUrl}
                                width={200}
                              />
                            </div>
                          );
                        }
                      )
                    ) : (
                      <NoData
                        title="No Appointments"
                        message="You haven’t scheduled any appointments yet."
                        isLoading={isLoading}
                      />
                    )}
                  </div>
                </div>
              )}
          </div>
          <div className="flex w-[24%] bg-white px-5 pt-7 fixed top-0 right-0 h-screen box-border drop-shadow-2xl flex-col overflow-y-auto pb-7 z-50">
            <p className="font-semibold text-gray-600 mb-5">
              Appointment Results
            </p>
            <div className="flex flex-col gap-y-6">
              <div>
                <p className="mb-2 text-sm">Diagnosis to make</p>
                <Input.TextArea
                  rows={5}
                  placeholder="Summarize what was the issue on the vehicle and the repairs to be made."
                  value={diagnosisToMake}
                  onChange={(e) => setDiagnosisToMake(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button
                    className="rounded-full text-sm float-right self-end w-auto"
                    variant="primary"
                    onClick={handleDiagnosisToMake}
                    isLoading={diagnosisToMakeLoading}
                    disabled={!diagnosisToMake.trim() || diagnosisToMakeLoading}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
              {data?.data?.status !== AppointmentStatus.NOT_STARTED && (
                <div>
                  <p className="mb-2 text-sm">Diagnosis made</p>
                  <Input.TextArea
                    rows={5}
                    placeholder="Summarize what was done on the vehicle"
                    value={diagnosisMade}
                    onChange={(e) => setDiagnosisMade(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <Button
                      className="rounded-full text-sm float-right self-end w-auto px-7"
                      variant="primary"
                      onClick={handleDiagnosisMade}
                      isLoading={diagnosisMadeLoading}
                      disabled={!diagnosisMade.trim() || diagnosisMadeLoading}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
              <div className="w-full">
                <p className="mb-2 text-sm">Invoice</p>
                {user?.data && invoice?.data ? (
                  <Invoice
                    name={user?.data?.name}
                    email={user?.data?.email}
                    invoiceNumber={invoice?.data?.number}
                    issueDate={invoice?.data?.issueDate}
                    money={invoice?.data?.money}
                    service={service?.data?.title}
                    onClick={() => {
                      navigate(`/invoice/${invoice?.data?.id}`);
                      dispatch(setAppointment(data?.data as Appointment));
                    }}
                  />
                ) : (
                  <NoData
                    isLoading={invoiceLoading}
                    title="No Invoice"
                    message="No invoice available for this appointment!"
                  />
                )}
                {!invoice?.data && (
                  <Button
                    className="rounded-full text-sm float-right self-end w-auto px-7 mt-2"
                    variant="tertiary"
                    onClick={() =>
                      navigate(`/create-invoice/${data?.data?.id}`)
                    }
                  >
                    Create Invoice
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetails;

import Calendar2Icon from "@/assets/icons/Calendar2Icon";
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import InvoiceBillingCard from "@/components/invoice-billing-card/InvoiceBillingCard.component";
import InvoiceTableItems from "@/components/invoice-table-items/InvoiceTableItems.component";
import InvoiceTotal from "@/components/invoice-total/InvoiceTotal.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { InvoiceStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetInvoiceReportQuery } from "@/redux/api";
import { setInvoice } from "@/redux/features/appointment/appointmentSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { getStatusStyles } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { appointment, invoice } = useAppSelector(
    (state: RootState) => state.appointment
  );

  const { data, isLoading } = useGetInvoiceReportQuery(id as string, {
    skip: !id,
  });
  const totalAmount = data?.data?.items?.reduce((sum, item) => {
    return sum + Number(item.total);
  }, 0);
console.log(data?.data)
  const invoiceData = {
    invoiceNo: data?.data?.number,
    billedTo: {
      name: data?.data?.billedTo.name as string,
      email: data?.data?.billedTo.email as string,
      phoneNumber: data?.data?.billedTo.phoneNumber as string,
      address: data?.data?.billedTo.address as string,
    },
    billedFrom: {
      name: data?.data?.billedFrom.name as string,
      email: data?.data?.billedFrom.email as string,
      phoneNumber: data?.data?.billedFrom.phoneNumber as string,
      address: data?.data?.billedFrom.address as string,
    },
    vehicle: {
      make: data?.data?.vehicle?.make,
      model: data?.data?.vehicle?.model,
      registrationNumber: data?.data?.vehicle?.registrationNumber,
      year: data?.data?.vehicle?.year,
      vin: data?.data?.vehicle?.vin,
      trim: data?.data?.vehicle?.trim,
    },
    issueDate: data?.data?.issueDate,
    dueDate: data?.data?.dueDate,
    items: data?.data?.items,
    total: totalAmount,
    subTotal: totalAmount,
    tax: 0,
  };

  const handlePreviewInvoice = () => {
    dispatch(setInvoice(invoiceData));
    navigate(`/download-invoice`);
  };

  return (
    <DashboardLayout>
      <div className="w-[75%]">
        <div className=" flex gap-x-3 mb-7 mt-2">
          <InvoiceIcon />
          <h2>Invoice Details</h2>
        </div>
        <div className="p-5 border-2 rounded-3xl border-grey3">
          <div className="  ">
            {/* button section */}
            <div className="flex items-center gap-x-4 w-full justify-between mb-4 mt-2">
              <div
                className={twMerge(
                  "rounded-full px-4 py-1 lowercase first-letter:uppercase",
                  invoice?.status
                    ? getStatusStyles(invoice?.status, true)
                    : getStatusStyles(InvoiceStatus.DRAFT)
                )}
              >
                {invoice?.status ? invoice?.status : InvoiceStatus.DRAFT}
              </div>
              <div className="flex gap-x-4 items-center">
                <Button
                  className="rounded-full w-auto h-[38px] text-sm"
                  variant="secondary"
                  onClick={() => navigate(`/chat/${appointment?.id}`)}
                >
                  View Chat
                </Button>
                <Button
                  className="rounded-full w-auto h-[38px] text-sm"
                  onClick={handlePreviewInvoice}
                >
                  Download
                </Button>
              </div>
            </div>
            {/* number Section */}
            <div className="my-2">
              <h2 className="font-normal">Invoice Number</h2>
              <h1>{data?.data?.number}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 my-5 gap-x-7">
            <div>
              <h4 className="">Issue Date</h4>
              <div className="flex my-1 gap-2 font-semibold items-center">
                <Calendar2Icon />
                <h2>{data?.data?.issueDate}</h2>
              </div>
            </div>
            <div>
              <h4 className="">Due Date</h4>
              <div className="flex my-1 gap-2 font-semibold items-center">
                <Calendar2Icon />
                <h2>{data?.data?.dueDate}</h2>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-7 my-7">
            <div className="w-full">
              <p className="mb-2">Billed From</p>
              <InvoiceBillingCard
                name={data?.data?.billedFrom?.name}
                email={data?.data?.billedFrom?.email}
                phone={data?.data?.billedFrom?.phone}
                address={data?.data?.billedFrom?.address}
                isLoading={isLoading}
              />
            </div>
            <div className="w-full">
              <p className="mb-2">Billed To</p>
              <InvoiceBillingCard
                name={data?.data?.billedTo?.name}
                email={data?.data?.billedTo?.email}
                phone={data?.data?.billedTo?.phone}
                address={data?.data?.billedTo?.address}
                isLoading={isLoading}
              />
            </div>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div>
                {appointment && (
                  <div className="flex flex-col">
                    <label className="text-sm mb-2">Appointment</label>
                    <Appointment {...appointment} className="bg-transparent" />
                  </div>
                )}
              </div>
              <div className="px-3 py-4 border-2 rounded-3xl border-grey3 my-7">
                <InvoiceTableItems items={data?.data?.items} />
              </div>
            </>
          )}
          {isLoading ? (
            <Skeleton />
          ) : (
            <InvoiceTotal
              total={parseFloat(`${data?.data?.totalAmount}`)}
              isUpdating
              disabled={true}
            />
          )}
          {(invoice?.status === InvoiceStatus.PENDING ||
            invoice?.status === InvoiceStatus.DRAFT) && (
            <div className="flex justify-end gap-x-4 mt-10">
              <Button
                className="w-auto"
                onClick={() =>
                  navigate(`/update-invoice/${appointment?.id}/${id}`)
                }
              >
                Update Invoice
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetails;

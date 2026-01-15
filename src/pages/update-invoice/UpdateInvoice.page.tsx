/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import InvoiceBillingCard from "@/components/invoice-billing-card/InvoiceBillingCard.component";
import InvoiceTotal from "@/components/invoice-total/InvoiceTotal.component";
import DatePicker from "@/components/pickers/DatePicker.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import EditableTable from "@/components/table/EditableTable.component";
import { useToast } from "@/context/ToastContext";
import { InvoiceStatus, ToastType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAppointmentQuery,
  useGetChatContactsQuery,
  useGetInvoiceByAppointmentQuery,
  useUpdateInvoiceMutation,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { InvoiceDataType, InvoiceItem, UpdateInvoiceRequest } from "@/types";
import { getStatusStyles } from "@/utils";
import { formatStatusText } from "@/utils/formatStatusText";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const UpdateInvoice = () => {
  const { id, invoiceId } = useParams();
  const { user: adminUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();
  const { data: appointment } = useGetAppointmentQuery(id as string, {
    skip: !id,
  });
  const { data: invoice, isLoading: invoiceLoading, refetch } =
    useGetInvoiceByAppointmentQuery(id as string);
  const { data: chatContacts } = useGetChatContactsQuery(undefined);

  // const { data: user } = useGetUserQuery(
  //   appointment?.data?.createdBy as string,
  //   {
  //     skip: !appointment?.data?.createdBy,
  //   }
  // );
  const [dueDate, setDueDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [items, setItems] = useState<InvoiceDataType[]>([]);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState([]);
  useEffect(() => {
    if (invoice?.data) {
      const mappedInvoiceItems = invoice?.data?.items?.map(
        (item: InvoiceItem) => ({
          key: crypto.randomUUID(),
          item: item.name,
          quantity: item.quantity.toString(),
          unitPrice: item.price.toString(),
          totalPrice: (item.quantity * Number(item.price)).toFixed(2),
        })
      );
      setCurrentInvoiceItems(mappedInvoiceItems as any);
      setDueDate(invoice?.data?.dueDate as string);
      setIssueDate(invoice?.data?.issueDate as string);
      setTotal(invoice?.data?.money?.amount as number);
    }
  }, [invoice]);

  const handleCreateInvoice = () => {
    if (!appointment?.data) {
      console.error("No appointment data available");
      return;
    }
    if (appointment?.data) {
      const invoiceItems = items.map((item) => ({
        name: item.item,
        price: Number(item.unitPrice),
        quantity: Number(item.quantity),
      }));
      const data = {
        appointmentId: appointment?.data?.id as string,
        money: {
          amount: total ? total + fee : invoice?.data?.money?.amount,
          currency: "XAF",
        },
        issueDate,
        dueDate,
        items: invoiceItems as any,
      };
      const updateData = {
        data,
        id: invoiceId,
      };
      console.log('updateData', updateData)
      updateInvoice(updateData as UpdateInvoiceRequest)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          if (res?.meta?.message) {
            toast(ToastType.SUCCESS, res?.meta?.message as string);
          }
          refetch()
        })
        .catch((err) => {
          console.log("err", err);
          const validationErrors = err?.data?.errors;
          if (validationErrors) {
            Object.values(validationErrors).forEach((errorMessage) => {
              toast(ToastType.ERROR, errorMessage as string);
            });
          } else if (err?.data?.message || err?.message) {
            toast(ToastType.ERROR, err?.data?.message || err?.message);
          } else {
            toast(ToastType.ERROR, "Update failed!");
          }
        });
    }
  };

  const getTotalPrice = (invoiceData: InvoiceDataType[]) => {
    const totalSum = invoiceData?.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );
    setTotal(totalSum);
  };

  const handleAdd = useCallback((items: any[]) => {
    setItems(items);
    getTotalPrice(items);
  }, []);
  const billedToUser = chatContacts?.data?.customers.find(
    (item) => item?.appointmentId === appointment?.data?.id
  );

  const handleFee = useCallback((f: number) => {
    setFee(f);
  }, []);

  const disabled = !appointment?.data || !dueDate || !issueDate || isLoading;

  return (
    <DashboardLayout>
      <div className="flex gap-x-6">
        <div className="pr-3 w-[65%] flex flex-col">
          <div className="mb-14 mt-4 justify-between flex">
            <div className="flex items-center gap-x-3">
              <InvoiceIcon />
              <h2 className="font-medium">Invoice</h2>
            </div>
            <div
              className={twMerge(
                "bg-redAccent text-red-500 border border-primaryAccent text-sm rounded-2xl px-4 py-1 lowercase first-letter:uppercase whitespace-nowrap 2",
                invoice?.data &&
                  getStatusStyles(invoice?.data?.status as InvoiceStatus, true)
              )}
            >
              {invoice?.data &&
                formatStatusText(invoice?.data?.status as InvoiceStatus)}
            </div>
          </div>
          {invoiceLoading ? (
            <Skeleton paragraph={{ rows: 8 }} />
          ) : (
            <div className="flex-col flex gap-y-6">
              <div className="flex gap-x-7 justify-between">
                <Input
                  label="Service center"
                  placeholder="service center"
                  className="w-[100%]"
                  value={appointment?.data?.serviceCenter?.name ?? ""}
                  disabled
                />
                <Input
                  label="Vehicle"
                  placeholder="Vehicle"
                  className="w-[100%]"
                  value={appointment?.data?.vehicle?.name ?? ""}
                  disabled
                />
              </div>
              <div className="flex gap-x-7 justify-between">
                <DatePicker
                  label="Date Issued"
                  value={issueDate}
                  onSelect={(value) => setIssueDate(value as any)}
                  disabled
                  isISO
                />
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onSelect={(value) => setDueDate(value as any)}
                  isISO
                />
              </div>
              <div className="flex justify-between space-x-8">
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-2">Billed From</label>
                  <InvoiceBillingCard
                    profileImageUrl={adminUser?.profileImageUrl}
                    name={adminUser?.name}
                    email={adminUser?.email}
                    location={adminUser?.location}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-2">Billed To</label>
                  <InvoiceBillingCard
                    profileImageUrl={
                      billedToUser && billedToUser?.profileImageUrl
                    }
                    name={billedToUser && billedToUser?.name}
                    email={billedToUser && billedToUser?.email}
                    location={billedToUser && billedToUser?.location}
                  />
                </div>
              </div>
              {appointment?.data && (
                <div className="flex flex-col">
                  <label className="text-sm mb-2">Appointment</label>
                  <Appointment
                    {...appointment?.data}
                    className="bg-transparent"
                    onDetail={() =>
                      appointment &&
                      navigate(`/appointment/${appointment?.data?.id}`)
                    }
                  />
                </div>
              )}
              <div>
                <label className="text-sm mb-2">Purchased Items</label>
                <div className="border-grey3 border-2 rounded-xl mt-2">
                  <EditableTable
                    onChange={(values) => handleAdd(values)}
                    initialItems={currentInvoiceItems}
                  />
                </div>
              </div>
              <InvoiceTotal
                isUpdating
                total={total && total + fee}
                onFee={(f) => handleFee(f)}
              />
            </div>
          )}

          <div className="flex justify-end mt-10">
            <Button
              className="w-auto"
              onClick={handleCreateInvoice}
              isLoading={isLoading}
              disabled={disabled}
            >
              Update Invoice
            </Button>
          </div>
        </div>
        {/* <div className={twMerge("flex flex-col flex-[30%] gap-y-6")}></div> */}
      </div>
      {/* <Modal
              open={showPlans}
              onClose={() => setShowPlans(false)}
              title="Choose a Plan"
              onOk={() => setShowPlans(false)}
              okText="Select"
              footer={null}
            >
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3'>
                {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features}
                />
              ))}
              </div>
            </Modal> */}
    </DashboardLayout>
  );
};

export default UpdateInvoice;

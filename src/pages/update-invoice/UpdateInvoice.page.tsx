/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import InvoiceTotal from "@/components/invoice-total/InvoiceTotal.component";
import DatePicker from "@/components/pickers/DatePicker.component";
import EditableTable from "@/components/table/EditableTable.component";
import {
  useCreateInvoiceMutation,
  useGetAppointmentsMutation
} from "@/redux/api";
import { RootState, useAppSelector } from "@/redux/store";
import { InvoiceDataType } from "@/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const UpdateInvoice = () => {
  const { appointment } = useAppSelector(
    (state: RootState) => state.appointment
  );
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const [getAppointments, { data: appointments }] =
    useGetAppointmentsMutation();
  const [dueDate, setDueDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [items, setItems] = useState<InvoiceDataType[]>([]);
  const [total, setTotal] = useState(0);
  const fromUser = '';
  const toUser = ''

  useEffect(() => {
    getAppointments({});
  }, []);

  const handleCreateInvoice = () => {
    const invoiceItems = items?.map((item) => {
      return {
        name: item.item,
        price: item.totalPrice,
        quantity: item.quantity,
      };
    });
    const data = {
      appointmentId: appointment?.id,
      vehicleId: appointment?.vehicle?.id,
      money: {
        amount: total,
        currency: "XAF",
      },
      issueDate,
      dueDate,
      billedFromUserId: fromUser,
      billedToUserId: toUser,
      items: invoiceItems as any,
    };
    createInvoice(data)
      .unwrap()
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log("err", err));
  };

  const getTotalPrice = (invoiceData: InvoiceDataType[]) => {
    const totalSum = invoiceData?.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );
    setTotal(totalSum);
    return totalSum;
  };

  const disabled = !appointment?.id || appointment?.vehicle?.id || !total;

  return (
    <div className="flex gap-x-6">
      <div className="pr-3 w-[65%] flex flex-col">
        <div className="mb-14 mt-4 justify-between flex">
          <div className="flex items-center gap-x-3">
            <InvoiceIcon />
            <h2 className="font-medium">Appointments</h2>
          </div>
          <div
            className={twMerge(
              "bg-redAccent text-red border border-primaryAccent text-sm rounded-2xl px-4 py-1 lowercase first-letter:uppercase whitespace-nowrap 2"
            )}
          >
            Unpaid
          </div>
        </div>
        <div className="flex-col flex gap-y-6">
          <div className="flex gap-x-7 justify-between">
            <Input
              label="location type"
              placeholder="location type"
              className="w-[100%]"
              value={appointment?.locationType}
              disabled
            />
            <Input
              label="Vehicle"
              placeholder="Vehicle"
              className="w-[100%]"
              value={appointment?.vehicle?.name}
              disabled
            />
          </div>
          <div className="flex gap-x-7 justify-between">
            <DatePicker
              label="Date Issued"
              onSelect={(value) => setIssueDate(value)}
            />
            <DatePicker
              label="Due Issued"
              onSelect={(value) => setDueDate(value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-2">Billed To</label>
            {/* <InvoiceBillingCard
              profileImageUrl={user?.profileImageUrl}
              name={user?.name}
              email={user?.email}
              location={user?.location}
            /> */}
          </div>
          {appointments?.data && appointments?.data?.length > 0 && (
            <div className="flex flex-col">
              <label className="text-sm mb-2">Service</label>
              <Appointment
                {...appointments?.data?.[0]}
                className="bg-transparent"
              />
            </div>
          )}
          <div className="p-5 border-grey3 border-2 rounded-xl ">
            <EditableTable
              onAdd={(items) => {
                setItems(items);
              }}
              onDelete={(items) => {
                setItems(items);
              }}
            />
          </div>
          <InvoiceTotal total={items?.length > 0 ? getTotalPrice(items) : 0} />
        </div>
        <div className="flex justify-end gap-x-4 mt-10">
          <Button className="w-auto" variant="tertiary">
            Save Draft
          </Button>
          <Button
            className="w-auto"
            onClick={handleCreateInvoice}
            isLoading={isLoading}
            disabled={disabled}
          >
            Send to Client
          </Button>
        </div>
      </div>
      {/* <div className={twMerge("flex flex-col flex-[30%] gap-y-6")}></div> */}
    </div>
  );
};

export default UpdateInvoice;

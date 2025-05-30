/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import InvoiceBillingCard from "@/components/invoice-billing-card/InvoiceBillingCard.component";
import InvoiceTotal from "@/components/invoice-total/InvoiceTotal.component";
import DatePicker from "@/components/pickers/DatePicker.component";
import EditableTable from "@/components/table/EditableTable.component";
import {
  useCreateInvoiceMutation,
  useGetAppointmentQuery,
  useGetUserQuery,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { InvoiceDataType } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const CreateInvoice = () => {
  const { id } = useParams();
  const { user_info, user: adminUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { data: appointment } = useGetAppointmentQuery(id as string, {
    skip: !id,
  });
  const { data: user } = useGetUserQuery(
    appointment?.data?.createdBy as string,
    {
      skip: !appointment?.data?.createdBy,
    }
  );
  const dateToday = dayjs();
  const dateInThreeDays = dayjs().add(3, "day");
  const [dueDate, setDueDate] = useState(dateInThreeDays);
  const [issueDate, setIssueDate] = useState(dateToday);
  const [items, setItems] = useState<InvoiceDataType[]>([]);
  const [total, setTotal] = useState(0);

  const handleCreateInvoice = () => {
    const invoiceItems = items?.map((item) => {
      return {
        name: item.item,
        price: item.totalPrice,
        quantity: item.quantity,
      };
    });
    const data = {
      appointmentId: appointment?.data?.id,
      vehicleId: appointment?.data?.vehicle?.id,
      money: {
        amount: total,
        currency: "XAF",
      },
      issueDate,
      dueDate,
      billedFromUserId: user_info?.userId,
      billedToUserId: user?.data?.id,
      items: invoiceItems as any,
    };
    console.log("data", data);
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

  const disabled = !appointment?.data;

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
              value={appointment?.data?.locationType}
              disabled
            />
            <Input
              label="Vehicle"
              placeholder="Vehicle"
              className="w-[100%]"
              value={appointment?.data?.vehicle?.name}
              disabled
            />
          </div>
          <div className="flex gap-x-7 justify-between">
            <DatePicker
              label="Date Issued"
              onSelect={(value) => setIssueDate(value as any)}
            />
            <DatePicker
              label="Due Date"
              onSelect={(value) => setDueDate(value as any)}
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
                profileImageUrl={user?.data?.profileImageUrl}
                name={user?.data?.name}
                email={user?.data?.email}
                location={user?.data?.location}
              />
            </div>
          </div>
          {appointment?.data && (
            <div className="flex flex-col">
              <label className="text-sm mb-2">Service</label>
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

export default CreateInvoice;

/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import InvoiceBillingCard from "@/components/invoice-billing-card/InvoiceBillingCard.component";
import InvoiceTotal from "@/components/invoice-total/InvoiceTotal.component";
import Modal from "@/components/modals/Modal.component";
import DatePicker from "@/components/pickers/DatePicker.component";
import EditableTable from "@/components/table/EditableTable.component";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useCreateInvoiceMutation,
  useGetAppointmentQuery,
  useGetChatContactsQuery,
} from "@/redux/api";
import { setInvoice } from "@/redux/features/appointment/appointmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { InvoiceData, InvoiceDataType } from "@/types";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const CreateInvoice = () => {
  const { id } = useParams();
  const { user: adminUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [invId, setInvId] = useState("");
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { data: appointment } = useGetAppointmentQuery(id as string, {
    skip: !id,
  });
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
  const handleCreateInvoice = () => {
    if (!appointment?.data) {
      console.error("No appointment data available");
      return;
    }
    if (appointment?.data) {
      const invoiceItems = items?.map((item) => {
        return {
          name: item.item,
          price: Number(item.totalPrice) || 0,
          quantity: Number(item.quantity) || 0,
        };
      });
      const data = {
        appointmentId: appointment?.data?.id as string,
        money: {
          amount: total + fee,
          currency: "XAF",
        },
        issueDate,
        dueDate,
        items: invoiceItems as any,
      };
      createInvoice(data)
        .unwrap()
        .then((res) => {
          if (res?.data?.id) {
            setInvId(res?.data?.id);
          }
          if (res?.meta?.message) {
            toast(ToastType.SUCCESS, res?.meta?.message as string);
          }
        })
        .catch((err) => {
          const validationErrors = err?.data?.errors;
          if (validationErrors) {
            Object.values(validationErrors).forEach((errorMessage) => {
              toast(ToastType.ERROR, errorMessage as string);
            });
          } else if (err?.data?.message || err?.message) {
            toast(ToastType.ERROR, err?.data?.message || err?.message);
          } else {
            toast(ToastType.ERROR, "Failed to create invoice!");
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
  const disabled = !appointment?.data || !dueDate || !issueDate || isLoading;
  // ||
  // !items?.length ||
  // total <= 0 ||
  // appointment?.data?.status !== "COMPLETED";

  const handleAdd = useCallback((items: any[]) => {
    setItems(items);
    getTotalPrice(items);
  }, []);
  const billedToUser = chatContacts?.data?.customers.find(
    (item) => item?.appointmentId === appointment?.data?.id
  );
  const appData = appointment?.data;
  const handlePreviewInvoice = () => {
    const invoiceItems = items?.map((item) => {
      return {
        name: item.item,
        price: item.totalPrice,
        quantity: item.quantity,
      };
    });
    const invoiceData: InvoiceData = {
      billedTo: {
        name: billedToUser?.name as string,
        email: billedToUser?.email as string,
        phoneNumber: billedToUser?.phoneNumber as string,
      },
      billedFrom: {
        name: adminUser?.name,
        email: adminUser?.email,
        phone: adminUser?.phone,
      },
      vehicle: {
        make: appData?.vehicle?.make,
        model: appData?.vehicle?.model,
        registrationNumber: appData?.vehicle?.registrationNumber,
        year: appData?.vehicle?.year,
        vin: appData?.vehicle?.vin as string,
      },
      issueDate,
      dueDate,
      items: invoiceItems,
      total: total + fee,
      subTotal: total + fee,
      tax: 0,
    };
    dispatch(setInvoice(invoiceData));
  };

  const handleFee = useCallback((f: number) => {
    setFee(f);
  }, []);

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
                "bg-redAccent text-red-500 border border-primaryAccent text-sm rounded-2xl px-4 py-1 lowercase first-letter:uppercase whitespace-nowrap 2"
              )}
            >
              Unpaid
            </div>
          </div>
          <div className="flex-col flex gap-y-6">
            <div className="flex gap-x-7 justify-between">
              <Input
                label="Service center"
                placeholder="service center"
                className="w-[100%]"
                value={appointment?.data?.serviceCenter?.name}
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
                value={issueDate}
                onSelect={(value) => {
                  console.log("value", value);
                  setIssueDate(value as any);
                }}
                isISO
              />
              <DatePicker
                value={dueDate}
                label="Due Date"
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
                {/* <InvoiceBillingCard
                  profileImageUrl={user?.data?.profileImageUrl}
                  name={user?.data?.name}
                  email={user?.data?.email}
                  location={user?.data?.location}
                /> */}
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
                <EditableTable onChange={(values) => handleAdd(values)} />
              </div>
            </div>
            <InvoiceTotal total={total + fee} onFee={(f) => handleFee(f)} />
          </div>
          <div className="flex justify-end gap-x-4 mt-10">
            <Button
              className="w-auto"
              variant="tertiary"
              onClick={handlePreviewInvoice}
              disabled={disabled}
            >
              Preview Invoice
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
      <Modal
        open={invId?.length > 0}
        onClose={() => setInvId("")}
        title="Preview Invoice"
        onOk={() => navigate(`/download-invoice/${invId}`)}
        width={window.innerWidth * 0.3}
        okText="View Invoice"
        confirmLoading={isLoading}
      >
        <p>Do you want to preview this invoice?</p>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateInvoice;

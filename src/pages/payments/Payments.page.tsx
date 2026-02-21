/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentIcon } from "@/assets/icons/PaymentIcon";
import WithdrawPaymentMethod from "@/components/add-payment-steps/WithdrawPaymentMethod.component";
import Button from "@/components/button/Button.component";
import Drawer from "@/components/drawer/Drawer.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Modal from "@/components/modals/Modal.component";
import Successful from "@/components/successful/Successful.component";
import Table from "@/components/table/Table.component";
import { getPaymentsColumns, PaymentsStatuses } from "@/constants";
import { PaymentStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetPaymentsQuery } from "@/redux/api";
import { formatAmount } from "@/utils";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [revenue, setRevenue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.ALL);
  const [previewUrl, setPreviewUrl] = useState("");

  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery({
    status,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const totalAmount = payments?.data?.reduce(
      (sum, payment) => sum + (payment?.totalAmount || 0),
      0
    );
    if (totalAmount) {
      setRevenue(`${totalAmount.toString()} XAF`);
    }
  }, [payments]);

  useEffect(() => {
    const filteredTableData = payments?.data.map((item) => {
      return {
        invoiceId: item.invoiceId,
        receiptFileUrl: item.receiptFileUrl,
        amount: item.amount,
        status: item.paymentDate ? PaymentStatus.PAID : PaymentStatus.ALL,
        paymentDate: item.paymentDate,
        paymentMethodName: item.paymentMethodName,
        userFrom: item.userFrom,
        totalPaid: `${item.totalPaid} XAF`,
        fullyPaid: item.fullyPaid,
      };
    });
    setTableData(filteredTableData as any);
  }, [payments, status]);

  const handleViewDetails = (id: string) => {
    navigate(`/invoice/${id}`);
  };
  const handleViewReceipt = (url: string) => {
    console.log("url", url);
    setPreviewUrl(url);
  };

  const columns = getPaymentsColumns(handleViewDetails, handleViewReceipt);

  const clearModal = () => {
    setPreviewUrl("");
  };
  return (
    <DashboardLayout showBack={false}>
      <div className="flex items-center gap-x-3 mb-5">
        <PaymentIcon />
        <h2 className="font-medium">Payments</h2>
      </div>
      <div>
        <div className="h-[180px]  w-full rounded-xl border-2  p-4 flex justify-between  ">
          <div className="flex flex-col justify-between">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2V14.75C0 16.5449 1.45508 18 3.25 18H15.25C17.0449 18 18.5 16.5449 18.5 14.75V6.25C18.5 4.71321 17.4333 3.42555 16 3.08697V2.25C16 1.00736 14.9926 0 13.75 0H2.25C1.09186 0 0.138093 0.875013 0.0137322 2H0ZM2.25 3C1.83579 3 1.5 2.66421 1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H13.75C14.1642 1.5 14.5 1.83579 14.5 2.25V3H2.25ZM13.25 10H15.25C15.6642 10 16 10.3358 16 10.75C16 11.1642 15.6642 11.5 15.25 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75C12.5 10.3358 12.8358 10 13.25 10Z"
                fill="#FB7C37"
              />
            </svg>

            <div>
              <h1 className="text-3xl">
                {revenue ? formatAmount?.(revenue) : 0} XAF
              </h1>
              <h4 className="text-grey">Available for Withdrawal</h4>
            </div>
          </div>
          <div className="self-end">
            <Button
              className="rounded-full"
              onClick={() => {
                setOpen(true);
                setSuccessOpen(false);
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-7">
        <h3 className="font-medium">Transactions</h3>
        <FilterBar
          filters={PaymentsStatuses}
          onFilter={(filter) => setStatus(filter as PaymentStatus)}
          hideLayoutButtons
        />
        <div>
          <Table
            data={tableData}
            columns={columns}
            pageSize={6}
            loading={paymentsLoading}
            emptyText="No Payments Available"
          />
        </div>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
          setSuccessOpen(false);
        }}
        title="Withdrawal method"
      >
        <WithdrawPaymentMethod
          onNext={() => {
            setSuccessOpen(true);
            setOpen(false);
          }}
        />
      </Drawer>
      <Drawer
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          setOpen(false);
        }}
        title="Successful"
      >
        <Successful />
      </Drawer>
      <Modal open={previewUrl?.length > 0} onCancel={clearModal} footer={null}>
        <div className="w-full h-full flex justify-center items-center">
          <Image src={previewUrl} height={500} alt="Preview" preview={false} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Payments;

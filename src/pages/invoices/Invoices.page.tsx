/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Modal from "@/components/modals/Modal.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import { getInvoicesColumns, InvoiceStatuses } from "@/constants";
import { colors } from "@/constants/colors";
import { useToast } from "@/context/ToastContext";
import { InvoiceStatus, ToastType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useDeleteInvoiceMutation, useGetInvoicesQuery } from "@/redux/api";
import { Invoice } from "@/types";
import { formatMoney } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [status, setStatus] = useState<InvoiceStatus>(InvoiceStatus.ALL);
  const { data, isLoading } = useGetInvoicesQuery({
    status,
  });
  const [deleteInvoice, { isLoading: deleteLoading }] =
    useDeleteInvoiceMutation();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const getInvoicesData = useCallback(() => {
    const filteredTableData = data?.data?.map((item) => {
      return {
        id: item.id,
        status: item.status ? item.status : InvoiceStatus.DRAFT,
        number: item.number,
        amount: item.money?.amount
          ? `${formatMoney(item.money?.amount)} ${item.money?.currency}`
          : "0",
        issueDate: item.issueDate,
        paidDate: item?.paidDate ?? null,
        dueDate: item?.dueDate ?? null,
        billedToUser: item?.billedToUser ?? null,
      };
    });
    if (filteredTableData) {
      const pendingInvoices = data?.data?.filter(
        (item) => item.status === InvoiceStatus.PENDING
      );
      if (pendingInvoices) {
        setPendingInvoices(pendingInvoices.length.toString());
      }
      setInvoicesList(filteredTableData as any);
    }
  }, [data]);

  useEffect(() => {
    getInvoicesData();
  }, [data, getInvoicesData]);

  const handleDelete = (id: string) => {
    setId(id);
  };
  const onDelete = () => {
    deleteInvoice(id)
      .unwrap()
      .then((res) => {
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
          toast(ToastType.ERROR, "Update failed!");
        }
      })
      .finally(() => {
        setId("");
      });
  };
  const handleDownload = (id: string) => {
    navigate(`/download-invoice/${id}`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/invoice/${id}`);
    return;
  };

  const columns = getInvoicesColumns(
    handleDelete,
    handleViewDetails,
    handleDownload
  );

  return (
    <DashboardLayout showBack={false}>
      <div>
        {/* header */}
        <div className="space-y-5 mb-5">
          <div className="flex gap-3 ">
            <InvoiceIcon />
            <h2 className="font-medium">Invoices</h2>
          </div>
        </div>
        {/* statistics */}
        <FilterBar
          filters={InvoiceStatuses}
          onFilter={(filter) => {
            setStatus(filter as InvoiceStatus);
          }}
          hideLayoutButtons
        />
        <div className="flex gap-5 mt-5">
          <div className="w-72">
            <StatisticsCard
              icon={<InvoiceIcon color={colors.primary} />}
              second
              value={pendingInvoices}
              title="Pending Invoices"
              isSmall
              isLoading={isLoading}
            />
          </div>
          <div className="w-72">
            <StatisticsCard
              badgeTitle=""
              icon={<InvoiceIcon color={colors.primary} />}
              second
              value={invoicesList?.length?.toString()}
              title="Total Invoices"
              isSmall
              isLoading={isLoading}
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={invoicesList}
          loading={isLoading}
          pageSize={5}
        />
      </div>
      <Modal
        open={id?.length > 0}
        onClose={() => setId("")}
        title="Delete Invoice"
        onOk={onDelete}
        width={window.innerWidth * 0.3}
        okText="Delete"
        confirmLoading={deleteLoading}
      >
        <p>Are you sure you want to delete this Invoice</p>
      </Modal>
    </DashboardLayout>
  );
};

export default Invoices;

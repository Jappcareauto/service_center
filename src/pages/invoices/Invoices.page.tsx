/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import { getInvoicesColumns } from "@/constants";
import { colors } from "@/constants/colors";
import { InvoiceStatus } from "@/enums";
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetInvoicesMutation } from "@/redux/api";
import { Invoice } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [getInvoices, { isLoading }] = useGetInvoicesMutation();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState("");
  const navigate = useNavigate();

  const getInvoicesData = (status?: string) => {
    const submitData = status
      ? {
          status,
        }
      : {};
    getInvoices(submitData)
      .unwrap()
      .then((res) => {
        const filteredTableData = res.data.map((item) => {
          return {
            id: item.id,
            status: item.status ? item.status : InvoiceStatus.DRAFT,
            number: item.number,
            amount: `${item.money?.amount} ${item.money?.currency}`,
            issueDate: item.issueDate,
            paidDate: item?.paidDate ?? null,
            dueDate: item?.dueDate ?? null,
          };
        });
        if (filteredTableData) {
          const pendingInvoices = res.data.filter(
            (item) => item.status === InvoiceStatus.PENDING
          );
          setPendingInvoices(pendingInvoices.length.toString());
          setInvoicesList(filteredTableData as any);
        }
      });
  };

  useEffect(() => {
    getInvoicesData();
  }, []);

  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleMore = () => {};

  const handleViewDetails = (id: string) => {
    navigate(`/invoice/${id}`);
    return;
  };

  const columns = getInvoicesColumns(
    handleDelete,
    handleViewDetails,
    handleEdit,
    handleMore
  );

  return (
    <DashboardLayout showBack={false}>
      <div>
      {/* header */}
      <div className="space-y-5">
        <div className="flex gap-3 ">
          <InvoiceIcon />
          <h2 className="font-medium">Invoices</h2>
        </div>
      </div>
      {/* statistics */}
      <div className="flex gap-5 mt-5  ">
        <div className="w-72">
          <StatisticsCard
            badgeTitle=""
            icon={<InvoiceIcon color={colors.primary} />}
            second
            value={pendingInvoices}
            title="Pending Invoces"
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
            title="Total Invoces"
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
    </DashboardLayout>
  );
};

export default Invoices;

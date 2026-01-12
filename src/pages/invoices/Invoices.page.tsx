/* eslint-disable @typescript-eslint/no-explicit-any */
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import { getInvoicesColumns, InvoiceStatuses } from "@/constants";
import { colors } from "@/constants/colors";
import { InvoiceStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetInvoicesQuery } from "@/redux/api";
import { Invoice } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [status, setStatus] = useState<InvoiceStatus>(InvoiceStatus.ALL);
  const { data, isLoading } = useGetInvoicesQuery({
    status,
  });
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState("");
  const navigate = useNavigate();
  const getInvoicesData = useCallback(() => {
    const filteredTableData = data?.data?.map((item) => {
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
              badgeTitle=""
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
    </DashboardLayout>
  );
};

export default Invoices;

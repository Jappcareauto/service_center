import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import InvoiceIcon from "@/shared/generics/menu/icons/InvoiceIcon";
import StatisticComponent from "@/shared/generics/statistics/StatisticComponent";
import { FC } from "react";
import InvoiceItem from "./components/invoiceItem";
import { InvoiceStatus } from "../model/InvoiceStatus";
import { useInvoicesView } from "./useInvoicesView";
import { InvoiceRoutes } from "../infra/routes/Router";

const InvoicesView: FC = () => {
 const {handleNavigation} =   useInvoicesView()
  return (
    <div>
      {/* geader */}
      <div className="space-y-5">
        <div className="flex gap-3 ">
          <InvoiceIcon />
          <h2 className="font-medium">Invoice</h2>
        </div>
        <div className="flex justify-between">
          <FilterBar
            labels={["Pending", "Paid", "Declined", "Draft"]}
            disableDisposition
          />
          <PrimaryButton className="border border-black bg-inherit text-black hover:bg-primary hover:text-white duration-200 hover:border-none h-10 rounded-full font-normal text-sm"
          
          onClick={()=>handleNavigation(InvoiceRoutes.createInvoice())}
          >
            Create Invoce
          </PrimaryButton>
        </div>
      </div>
      {/* statistics */}
      <div className="flex gap-5 mt-5  ">
        <div className="w-72">
          <StatisticComponent
            badgeTitle=""
            icon={<InvoiceIcon />}
            second
            value="07"
            title="Pending Invoces"
          />
        </div>
        <div className="w-72">
          <StatisticComponent
            badgeTitle=""
            icon={<InvoiceIcon />}
            second
            value="07"
            title="Total Invoces"
          />
        </div>
      </div>
      {/* invoice item */}
      <div className="mt-5">
        <InvoiceItem
          invoice={{
            name: "Invoice #001",
            price: 1200.5,
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: InvoiceStatus.Paid,
          }}
        />
        <InvoiceItem
          invoice={{
            name: "Invoice #001",
            price: 1200.5,
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: InvoiceStatus.Paid,
          }}
        />
        <InvoiceItem
          invoice={{
            name: "Invoice #001",
            price: 1200.5,
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: InvoiceStatus.Paid,
          }}
        />
        <InvoiceItem
          invoice={{
            name: "Invoice #001",
            price: 1200.5,
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: InvoiceStatus.Paid,
          }}
        />
        <InvoiceItem
          invoice={{
            name: "Invoice #001",
            price: 1200.5,
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: InvoiceStatus.Paid,
          }}
        />
      </div>
    </div>
  );
};

export default InvoicesView;

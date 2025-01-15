import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import InvoiceIcon from "@/shared/generics/menu/icons/InvoiceIcon";
import StatisticComponent from "@/shared/generics/statistics/StatisticComponent";
import { FC } from "react";
import InvoiceItem from "./components/invoiceItem";
import { useInvoicesView } from "./useInvoicesView";
import { InvoiceRoutes } from "../infra/routes/Router";
import Loader from "@/shared/generics/loader/Loader";
import { LoadingState } from "@/shared/enums/LoadingState";

const InvoicesView: FC = () => {
  const { handleNavigation, invoiceState } = useInvoicesView();
  const invoicesList = invoiceState.invoices?.map((invoice) => (
    <InvoiceItem invoice={invoice} key={invoice.id} />
  ));

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
          <PrimaryButton
            className="border border-black bg-inherit text-black hover:bg-primary hover:text-white duration-200 hover:border-none h-10 rounded-full font-normal text-sm"
            onClick={() => handleNavigation(InvoiceRoutes.createInvoice())}
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
      {invoiceState.loading === LoadingState.pending && (
        <div className="flex justify-center my-5 duration-300 ease-in-out">
          <Loader />
        </div>
      )}
      <div className="mt-5  contain-layout duration-1000 ">{invoicesList}</div>
    </div>
  );
};

export default InvoicesView;

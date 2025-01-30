import ButtonStatus from "./components/ButtonStatus";
import { InvoiceStatus } from "../model/InvoiceStatus";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import InvoiceIcon from "@/shared/generics/menu/icons/InvoiceIcon";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import InvoiceBillingCard from "./InvoiceForm/InvoiceBillingCard";
import ChevronDown from "@/shared/generics/menu/icons/ChevronDown";
import FormInvoiceServicesItem from "./InvoiceForm/FormInvoiceServicesItem";
import InvoceFormTotal from "./InvoiceForm/InvoceFormTotal";
import { useActiveInvoice } from "./components/hooks/useActiveIvoice";
import { formatDateToMedium } from "@/shared/utils/dateFormat";

function InvoiceDetail() {
  const {
    state: { activeInvoice },
  } = useActiveInvoice();
  const issueDate = formatDateToMedium(activeInvoice?.issueDate || "");
  const dueDate = formatDateToMedium(activeInvoice?.dueDate || "");
  return (
    <div className="">
      <div className=" flex gap-x-3 my-5">
        <InvoiceIcon />
        <h2>Invoice</h2>
      </div>
      <div className="p-5 border-2 rounded-3xl border-grey3">
        <div className="  ">
          {/* button section */}
          <div className="flex items-center gap-x-2 w-full justify-end">
            <ButtonStatus status={InvoiceStatus.Paid} />
            <PrimaryButton className=" hover:text-white hover:border-primary duration-200 hover:bg-primary border-black border-2 h-10 rounded-full bg-inherit text-black font-mono ">
              Download
            </PrimaryButton>
          </div>
          {/* number Section */}
          <div className="my-2">
            <h2 className="font-normal">Invoice Number</h2>
            <h1>{activeInvoice?.number} </h1>
          </div>
        </div>
        {/* date section */}
        <div></div>
        {/* billed Section */}
        <div className="grid grid-cols-2 my-5">
          <div>
            <h4 className="">Issue Date</h4>
            <div className="flex my-1 gap-2 font-semibold items-center">
              <Calendar2Icon />
              <h2> {issueDate} </h2>
            </div>
          </div>
          <div>
            <h4 className="">Due Date</h4>
            <div className="flex my-1 gap-2 font-semibold items-center">
              <Calendar2Icon />
              <h2> {dueDate} </h2>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-4  my-5">
          <div className="w-full">
            <h2>Billed From</h2>

            <InvoiceBillingCard
              user={{
                email: activeInvoice?.billedFromUser?.email || "",
                id: activeInvoice?.billedFromUser?.id || "",
                name: activeInvoice?.billedFromUser?.name || "",
                phoneNumber:
                  activeInvoice?.billedFromUser?.phones?.[0]?.number || "",
              }}
            />
          </div>
          <div className="w-full">
            <h2>Billed To</h2>
            <InvoiceBillingCard
              user={{
                email: activeInvoice?.billedToUser?.email || "",
                id: activeInvoice?.billedToUser?.id || "",
                name: activeInvoice?.billedToUser?.name || "",
                phoneNumber:
                  activeInvoice?.billedToUser?.phones?.[0]?.number || "",
              }}
            />
          </div>
        </div>
        <div className="my-5">
          <div
            className={`   duration-200 p-2 space-y-2 border-grey3  border-2 rounded-xl flex justify-between min-h-20 "}`}
          >
            <div className="">
              <h2 className="text-primary ">Service </h2>
              <h3 className="font-medium">
                {activeInvoice?.appointment?.date}
              </h3>
            </div>
            <ChevronDown />
          </div>
        </div>
        <div>
          <FormInvoiceServicesItem
            labourFee={20000}
            isEdditing={false}
            servicesItems={activeInvoice.items}
          />
        </div>
        <div className="my-5">
          <InvoceFormTotal
            isEdditing={false}
            subTotal={20000}
            taux={10}
            totalAmount={21000}
            PaymentMethod="Mobile Money"
            TauxAmount={10}
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;

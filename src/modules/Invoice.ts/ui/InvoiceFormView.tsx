import { FC } from "react";
import InvoiceFormHeader from "./InvoiceForm/FormHeader";
import Input from "@/shared/generics/inputs/Input";
import ChevronDown from "@/shared/generics/menu/icons/ChevronDown";
import FormServicesItem from "./InvoiceForm/FormInvoiceServicesItem";
import InvoceFormTotal from "./InvoiceForm/InvoceFormTotal";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import useInvoicesForm from "./InvoiceForm/useInvoicesForm";
import InvoiceFormServiceCenterItem from "./InvoiceForm/InvoiceFormServiceCenter";
import InvoiceBillingCard from "./InvoiceForm/InvoiceBillingCard";

const InvoiceFormView: FC = () => {
  const {
    action,
    state: { activeServiceCenter, isServiceListOpen },
  } = useInvoicesForm();
  const {
    state: { serviceCenterState },
  } = useInvoicesForm();
  return (
    <div className="mb-5">
      <InvoiceFormHeader />
      {/* first part */}
      <div className=" grid grid-cols-2 gap-x-5">
        <Input label="Invoice Number" onChange={() => {}} />
        <Input label="Vehicle" onChange={() => {}} />
        <Input
          label="Issue Date"
          type="date"
          value={"2025-01-01"}
          onChange={() => {}}
        />
        <Input
          label="Due Date"
          type="date"
          value={"2025-01-01"}
          onChange={() => {}}
        />
      </div>
      {/* billed To */}
      <div>
        <InvoiceBillingCard />
      </div>

      {/* service */}
      <div className="mt-5 relative  ">
        <div
          onClick={action.toogleServiceList}
          className={` hover:bg-primaryAccent cursor-pointer duration-200 p-2 space-y-2 border-grey3  border-2 rounded-xl flex justify-between min-h-20 ${
            isServiceListOpen && "bg-primaryAccent"
          }`}
        >
          <div className="">
            <h2 className="text-primary ">Service </h2>
            <h3 className="font-medium">{activeServiceCenter.name}</h3>
          </div>
          <ChevronDown
            className={`${
              isServiceListOpen && "rotate-180 duration-300 ease-linear"
            } `}
          />
        </div>
        {isServiceListOpen && (
          <div className=" z-10 p-2 space-y-2 bg-background max-h-96 border-grey3  mt-1 absolute w-full border-2 border-t-0 rounded-xl flex flex-col  justify-between min-h-20">
            <div className="overflow-y-scroll">
              {serviceCenterState.servicesCenter?.map((serviceCenter) => (
                <div
                  key={serviceCenter.id}
                  onClick={() =>
                    action.handleSetServiceCenter({
                      description: serviceCenter.category,
                      id: serviceCenter.id,
                      name: serviceCenter.name,
                    })
                  }
                >
                  <InvoiceFormServiceCenterItem
                    data={{
                      description: serviceCenter.category,
                      name: serviceCenter.name,
                      id: serviceCenter.id,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* quantity */}
      <div className="mt-5">
        <FormServicesItem isEdditing />
      </div>
      <div className="mt-5">
        <InvoceFormTotal isEdditing />
      </div>
      <div className="flex justify-end px-2 gap-4 my-5">
        <PrimaryButton
          className="bg-inherit text-black border border-black"
          type="button"
        >
          Save Draft
        </PrimaryButton>
        <PrimaryButton
          type="button"
          onClick={() => action.handleSubmitForm({ navTo: "" })}
        >
          Send to client
        </PrimaryButton>
      </div>
    </div>
  );
};

export default InvoiceFormView;

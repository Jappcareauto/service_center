import { FC } from "react";
import InvoiceFormHeader from "./InvoiceForm/FormHeader";
import Input from "@/shared/generics/inputs/Input";
import FormServicesItem from "./InvoiceForm/FormInvoiceServicesItem";
import InvoceFormTotal from "./InvoiceForm/InvoceFormTotal";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import useInvoicesForm from "./InvoiceForm/hooks/useInvoicesForm";

import InvoiceListBilledTo from "./InvoiceForm/InvoiceListBilledTo";
import VehicleListItem from "./InvoiceForm/VehicleListItem";
import AppointmentComponent from "@/modules/dashboard/ui/components/AppointmentComponent";
import AppointmentDetailsView from "@/modules/appointment/ui/details/AppointmentDetailsView";
import { LoadingState } from "@/shared/enums/LoadingState";
import { formatDateToShortString } from "@/shared/utils/dateFormat";
import Loader from "@/shared/generics/loader/Loader";

const InvoiceFormView: FC = () => {
  const {
    action,
    state: { activeAppointment, formInput, isDueDate, formLoading },
  } = useInvoicesForm();

  return (
    <div className="mb-5">
      {activeAppointment && (
        <AppointmentDetailsView
          appointment={activeAppointment}
          loading={LoadingState.success}
        />
      )}
      <InvoiceFormHeader />
      {/* first part */}
      <div className=" grid grid-cols-2 gap-x-5">
        <Input label="Invoice Number" disabled onChange={() => {}} />

        <VehicleListItem />
        <Input
          label="Issue Date"
          type="date"
          value={formatDateToShortString(formInput.issueDate)}
          onChange={(e) => {
            action.handleChangeInput({
              key: "issueDate",
              value: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Due Date (Optional)"
          label="Due Date"
          type={`${isDueDate ? "date" : "text"}`}
          value={formInput.dueDate}
          onChange={(e) => {
            action.handleChangeInput({ key: "dueDate", value: e.target.value });
          }}
        />
      </div>
      {/* billed To */}
      <div>
        <h3 className="mt-4 -mb-2">Billed To</h3>

        <InvoiceListBilledTo />
      </div>

      {/* service */}
      <div className="mt-5 relative  ">
        <h3 className="my-2">Service</h3>
        <AppointmentComponent appointment={activeAppointment!} />
      </div>
      {/* quantity */}
      <div className="mt-5">
        <FormServicesItem isEdditing />
      </div>
      <div className="mt-5">
        <InvoceFormTotal isEdditing />
      </div>

      {formLoading === LoadingState.failed && (
        <div className="mt-5 duration-500 text-center text-red">
          Failed to create the invoice. This appointment may already have an
          invoice.
        </div>
      )}
      <div className="flex justify-end px-2 gap-4 my-5">
        {/* <PrimaryButton
          className="bg-inherit text-black border border-black"
          type="button"
        >
          Save Draft
        </PrimaryButton> */}

        <PrimaryButton type="button" onClick={() => action.handleSubmitForm()}>
          {formLoading === LoadingState.pending ? <Loader /> : "Send to client"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default InvoiceFormView;

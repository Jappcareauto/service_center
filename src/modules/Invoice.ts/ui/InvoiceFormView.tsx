import { FC } from "react";
import InvoiceFormHeader from "./InvoiceForm/FormHeader";
import Input from "@/shared/generics/inputs/Input";
import Avatar from "@/shared/generics/Avatar";
import ChevronDown from "@/shared/generics/menu/icons/ChevronDown";
import FormServicesItem from "./InvoiceForm/AppointmentServiceItem";

const InvoiceFormView: FC = () => {
  return (
    <div>
      <InvoiceFormHeader />

      {/* first part */}
      <div className=" grid grid-cols-2 gap-x-5">
        <Input label="Invoice Number" />
        <Input label="Vehicle" />
        <Input label="Issue Date" type="date" value={"2025-01-01"} />
        <Input label="Due Date" type="date" value={"2025-01-01"} />
      </div>
      {/* billed To */}
      <div className="mt-5 ">
        <h2 className="font-normal ">Billed To</h2>
        <div className="border-2 rounded-xl min-h-40 p-2 flex flex-col justify-center border-grey3">
          <div className="flex justify-between">
            <Avatar name="Sara May" className="h-8 w-8" />
            <ChevronDown />
          </div>
          <ul className="space-y-1 mt-1">
            <li className="font-normal">Deido, Douala ,Cameroun</li>
            <li className="font-normal">(555)1314-9684</li>
            <li className="font-normal">person@email.com</li>
          </ul>
        </div>
      </div>
      {/* service */}
      <div className="mt-5  ">
        <div className=" p-2 space-y-2 border-grey3  border-2 rounded-xl">
          <h2 className="text-primary ">Service</h2>
          <h3 className="font-medium">Boddy shop Appointemnt</h3>
        </div>
      </div>
      {/* quantity */}
      <div className="mt-5">
        <FormServicesItem />
      </div>
    </div>
  );
};

export default InvoiceFormView;

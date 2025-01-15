import Input from "@/shared/generics/inputs/Input";
import Switch from "@/shared/generics/switch/Switch";
import { FormServiceTotal } from "../../model/FormServiceTotal";
import { FC } from "react";
import useInvoicesForm from "./useInvoicesForm";
import { validPositiveNumber } from "@/shared/utils/validNumber";
type Props = {
  isEdditing: boolean;
  totalService?: FormServiceTotal;
};
const InvoceFormTotal: FC<Props> = ({ isEdditing }) => {
  const {
    action,
    state: { invoiceFormState },
  } = useInvoicesForm();

  const tauxValue = validPositiveNumber(invoiceFormState.totalAmountState.taux);
  return (
    <div className="p-4 border-grey3 border-2  rounded-xl ">
      <h2 className="border-b-2 pb-2 text-primary mb-2">Total</h2>
      <div className=" flex flex-col gap-y-4">
        {isEdditing && (
          <div className="flex justify-between items-center">
            <h3>Include Tax</h3>
            <Switch isEnable={invoiceFormState.totalAmountState.isTaux} onChange={(isOpen) => action.handleIsTaux(isOpen)} />
          </div>
        )}
        <div className="flex justify-between items-center">
          <h3>SubTotal</h3>
          <h3>{invoiceFormState.serviceState.totalPrices} Frs </h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3>Taux</h3>
            <Input
              className="max-w-24"
              placeholder="10%"
              value={tauxValue}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                action.handleChangeTaux(value);
              }}
              min={0}
            />
          </div>
          <h3>{invoiceFormState.totalAmountState.tauxAmount} Frs</h3>
        </div>
        <div className="h-12 p-4 bg-primaryAccent flex items-center justify-between text-primary rounded-xl">
          <h3>Total</h3>
          <h3> {invoiceFormState.totalAmountState.totalAmount} Frs</h3>
        </div>
      </div>
    </div>
  );
};

export default InvoceFormTotal;

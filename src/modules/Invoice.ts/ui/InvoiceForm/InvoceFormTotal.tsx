import Input from "@/shared/generics/inputs/Input";
import Switch from "@/shared/generics/switch/Switch";
import { FC } from "react";
import useInvoicesForm from "./hooks/useInvoicesForm";
import { validPositiveNumber } from "@/shared/utils/validNumber";
type Props = {
  isEdditing: boolean;
  taux?: number;
  TauxAmount?: number;
  totalAmount?: number;
  PaymentMethod?: string;
  subTotal?: number;
};
const InvoceFormTotal: FC<Props> = ({
  isEdditing,
  TauxAmount,
  taux,
  subTotal,
  PaymentMethod,
}) => {
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
            <Switch
              isEnable={invoiceFormState.totalAmountState.isTaux}
              onChange={(isOpen) => action.handleIsTaux(isOpen)}
            />
          </div>
        )}
        <div className="flex justify-between items-center">
          <h3>SubTotal</h3>
          <h3 className="font-semibold">
            {isEdditing ? invoiceFormState.serviceState.totalPrices : subTotal}
            {" "}  Frs
          </h3>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3>Taux</h3>
            <h3 className="font-semibold">{!isEdditing && taux} %</h3>
            {isEdditing && (
              <Input
                className="max-w-24"
                placeholder="10%"
                value={tauxValue}

                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  action.handleChangeTaux(value);
                }}
              />
            )}
          </div>
          <h3 className="font-semibold">
            {isEdditing
              ? invoiceFormState.totalAmountState.tauxAmount
              : TauxAmount}{" "}
            Frs
          </h3>
        </div>

        {!isEdditing && (
          <div className="   flex items-center justify-between  rounded-xl">
            <h3>Payment Method</h3>
            <h3 className="font-semibold"> {PaymentMethod} </h3>
          </div>
        )}
        <div className="h-12 p-4 bg-primaryAccent flex items-center justify-between text-primary rounded-xl">
          <h3>Total</h3>
          <h3 className="font-semibold">
            {isEdditing
              ? invoiceFormState.totalAmountState.totalAmount
              : subTotal}{" "}
            Frs
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoceFormTotal;

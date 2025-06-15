import { useState } from "react";
import Input from "../inputs/Input.component";
import Switch from "../switch/Switch.component";
import { InvoiceTotalProps } from "./types";

const InvoiceTotal = ({ total, onTotal, disabled, onFee }: InvoiceTotalProps) => {
  const [isTax, setIsTax] = useState(false);
  const [taxValue, setTaxValue] = useState("");
  const [fee, setFee] = useState("");

  const getTotal = (value: number) => {
    if (value && taxValue) {
      const taxPercentage = (Number(total) / value) * 100;
      onTotal?.(taxPercentage + value + Number(fee));
      return taxPercentage + value + Number(fee);
    } else {
      onTotal?.(value + Number(fee));
      return value + Number(fee);
    }
  };

  return (
    <div className="p-5 border-grey3 border-2 rounded-3xl">
      <p className="border-b pb-3 text-primary mb-5">Total</p>
      <div className=" flex flex-col gap-y-6">
        <div>
          <Input
            value={fee}
            label="Service Fee (workmanship + purchased items)"
            placeholder="cost of service"
            onChange={(e) => {
              setFee(e.target.value);
              onFee?.(Number(e.target.value))
            }}
            suffixIcon={<p className='font-bold text-gray-400'>XAF</p>}
            type="number"
          />
        </div>
        <div className="flex justify-between items-center">
          <h3>Include Tax</h3>
          <Switch value={isTax} onToggle={setIsTax} disabled={disabled} />
        </div>
        <div className="flex justify-between items-center">
          <h3>SubTotal</h3>
          <h3 className="font-semibold"> {total} XAF</h3>
        </div>
        {isTax && !disabled && (
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <h3>Tax</h3>
              <Input
                className="w-[40%]"
                type="number"
                placeholder="0%"
                value={taxValue}
                onChange={(e) => {
                  setTaxValue(e.target.value);
                }}
                disabled={disabled}
              />
            </div>
            <h3 className="font-semibold">{taxValue ? taxValue : "0"} %</h3>
          </div>
        )}
        <div className="   flex items-center justify-between  rounded-xl">
          <h3>Payment Method</h3>
          <h3 className="font-semibold">Mobile Money</h3>
        </div>

        <div className="h-12 p-4 bg-primaryAccent flex items-center justify-between text-primary rounded-xl">
          <h3>Total</h3>
          <h3 className="font-semibold">
            {total && <>{!isTax ? total : getTotal(Number(total))}</>} XAF
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotal;

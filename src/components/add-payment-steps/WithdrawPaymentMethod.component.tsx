import { paymentMethods } from "@/constants";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button/Button.component";
import Switch from "../switch/Switch.component";

const WithdrawPaymentMethod = ({onNext}: {onNext?: () => void}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col justify-between h-full  ">
      <div className="space-y-3">
        <div className="space-y-5 mb-10">
          {paymentMethods?.map((method) => (
            <div
              onClick={() => setActiveIndex(method?.id)}
              key={method?.id}
              className={twMerge(
                `flex items-center hover:cursor-pointer gap-x-3 border transition transform  ease-out ${
                  activeIndex === method?.id &&
                  "bg-primaryAccent text-primary border-primary"
                } h-[50px] px-3 duration-300  rounded-xl`
              )}
            >
              {method?.icon}
              <h3>{method?.title}</h3>
            </div>
          ))}
        </div>
        <div className="flex mt-16 justify-between">
          <p>Save as default withdrawal method</p>
          <Switch />
        </div>
      </div>
      <Button
        className="absolute w-[90%] bottom-4"
        onClick={onNext}
      >
        Continue
      </Button>
      
    </div>
  );
};

export default WithdrawPaymentMethod;

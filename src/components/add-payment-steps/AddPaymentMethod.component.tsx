import { paymentMethods } from "@/constants";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button/Button.component";

const AddPaymentMethod = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="flex flex-col justify-between h-full  ">
      <div className="space-y-3">
        <div className="space-y-5">
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
      </div>
      <Button className="absolute w-[90%] bottom-4">Continue</Button>
    </div>
  );
};

export default AddPaymentMethod;

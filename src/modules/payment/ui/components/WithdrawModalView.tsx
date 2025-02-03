import { RightModal } from "@/shared/generics/modals/RightModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { useModal } from "@/shared/helpers/hooks/useModal";
import { paymentMethods } from "../PaymentModelView";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Switch from "@/shared/generics/switch/Switch";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";

enum ActiveVue {
  selectPayment = "1",
  finalStep = "2",
}

export const WithdrawModalView = () => {
  const { close, isOpen } = useModal({
    eventName: ModalEventKey.WITHDRAW_PAYMENT,
  });
  const [activeIndex, setActiveIndex] = useState<{
    index: number;
    step?: ActiveVue;
  }>({
    index: 0,
    step: ActiveVue.selectPayment,
  });
  const [step, setStep] = useState<ActiveVue>(ActiveVue.selectPayment);

  const handleSetActiveVue = (value: ActiveVue) => {
    setStep(value);
  };
  const handleActive = ({
    index,
    step,
  }: {
    index: number;
    step?: ActiveVue;
  }) => {
    setActiveIndex({ step, index: index });
  };

  let content;

  switch (step) {
    case ActiveVue.finalStep:
      content = (
        <div className="px-6 py-10 flex flex-col justify-between h-full">
          <div className="space-y-12">
            <div
              onClick={() => {
                handleSetActiveVue(ActiveVue.selectPayment);
              }}
              className="flex items-center  gap-4 hover:opacity-60 hover:text-primar"
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7327 19.7905C11.0326 20.0762 11.5074 20.0646 11.7931 19.7647C12.0787 19.4648 12.0672 18.99 11.7673 18.7043L5.51587 12.7497L20.25 12.7497C20.6642 12.7497 21 12.4139 21 11.9997C21 11.5855 20.6642 11.2497 20.25 11.2497L5.51577 11.2497L11.7673 5.29502C12.0672 5.00933 12.0787 4.5346 11.7931 4.23467C11.5074 3.93475 11.0326 3.9232 10.7327 4.20889L3.31379 11.2756C3.14486 11.4365 3.04491 11.6417 3.01393 11.8551C3.00479 11.9019 3 11.9503 3 11.9997C3 12.0493 3.00481 12.0977 3.01398 12.1446C3.04502 12.3579 3.14496 12.563 3.31379 12.7238L10.7327 19.7905Z"
                    fill="#242424"
                  />
                </svg>
              </div>
              <h2 className="font-medium">Withdrawal</h2>
            </div>

            <div className="flex justify-center space-y-1 flex-col items-center pt-10">
              <img src="/paysuccess.png" />
              <h4>Withdrawal Successful</h4>
              <h2 className="text-primary">5,000 Frs</h2>
            </div>
          </div>
          {/* wid */}
          <PrimaryButton
            onClick={() => {
              close();
              handleSetActiveVue(ActiveVue.selectPayment);
            }}
          >
            Shown Report
          </PrimaryButton>
        </div>
      );
      break;

    default:
      content = (
        <div className="px-6 py-10 flex flex-col justify-between h-full">
          <div className="space-y-12">
            <div
              onClick={() => close()}
              className="flex items-center  gap-4 hover:opacity-60 hover:text-primar"
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7327 19.7905C11.0326 20.0762 11.5074 20.0646 11.7931 19.7647C12.0787 19.4648 12.0672 18.99 11.7673 18.7043L5.51587 12.7497L20.25 12.7497C20.6642 12.7497 21 12.4139 21 11.9997C21 11.5855 20.6642 11.2497 20.25 11.2497L5.51577 11.2497L11.7673 5.29502C12.0672 5.00933 12.0787 4.5346 11.7931 4.23467C11.5074 3.93475 11.0326 3.9232 10.7327 4.20889L3.31379 11.2756C3.14486 11.4365 3.04491 11.6417 3.01393 11.8551C3.00479 11.9019 3 11.9503 3 11.9997C3 12.0493 3.00481 12.0977 3.01398 12.1446C3.04502 12.3579 3.14496 12.563 3.31379 12.7238L10.7327 19.7905Z"
                    fill="#242424"
                  />
                </svg>
              </div>
              <h3 className="font-medium">Withdrawal</h3>
            </div>
            <div>
              <div className="bg-primaryAccent rounded-xl h-[50px] px-2 flex items-center justify-between ">
                <h4>Withdrawal</h4>
                <h4 className="text-primary font-bold">5,000 Frs</h4>
              </div>
              <div>
                <div className="mt-10 space-y-3">
                  <h2 className="font-medium" >Select Withdrawal Method</h2>
                  {paymentMethods.map((method, index) => (
                    <div
                      onClick={() => handleActive({ index: index })}
                      key={index}
                      className={twMerge(
                        `flex items-center hover:cursor-pointer justify-between border transition transform  ease-out ${
                          activeIndex.index === index &&
                          "bg-primaryAccent text-primary border-primary"
                        } h-[50px] px-3 duration-300  rounded-xl`
                      )}
                    >
                      <div className="flex items-center gap-x-2">
                        {method.icon}
                        <h3>{method.title}</h3>
                      </div>
                      <h4>**** **** **222</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h4>Save as default withdrawal method</h4>
              <Switch isEnable onChange={() => {}} />
            </div>
          </div>
          {/* wid */}
          <PrimaryButton
            onClick={() => handleSetActiveVue(ActiveVue.finalStep)}
          >
            Continue
          </PrimaryButton>
        </div>
      );
      break;
  }
  return (
    <RightModal isOpen={isOpen} close={close}>
      {content}
    </RightModal>
  );
};

import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Input from "@/shared/generics/inputs/Input";
import { RightModal } from "@/shared/generics/modals/RightModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { useModal } from "@/shared/helpers/hooks/useModal";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

enum ActiveVue {
  selectPayment = "1",
  mobile = "2",
  card = "3",
}
export const paymentMethods = [
  {
    title: "MTN Momo",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="4" fill="#FFCC00" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.5567 15.7822C30.5567 19.8041 24.0386 23.0657 16 23.0657C7.95637 23.0657 1.43823 19.8041 1.43823 15.7822C1.43823 11.7655 7.95637 8.50391 16 8.50391C24.0386 8.50391 30.5567 11.7655 30.5567 15.7822ZM29.4061 15.7822C29.4061 12.3973 23.4068 9.65447 16 9.65447C8.59329 9.65447 2.58879 12.3973 2.58879 15.7822C2.58879 19.1671 8.59329 21.9151 16 21.9151C23.4068 21.9151 29.4061 19.1671 29.4061 15.7822ZM14.1612 14.5084V13.3578H18.2703V14.5084H16.791V18.2118H15.6405V14.5084H14.1612ZM23.227 13.3578V18.2118H22.0764L19.991 15.3251V18.2118H18.8456V13.3578H19.991L22.0764 16.2445V13.3578H23.227ZM8.73711 18.2118V13.3578H9.88253L11.1615 15.32L12.4405 13.3578H13.5859V18.2118H12.4405V15.4638L11.5673 16.8044H10.7557L9.88253 15.4638V18.2118H8.73711Z"
          fill="#020001"
        />
      </svg>
    ),
    step: ActiveVue.mobile,
  },
  {
    title: "Orange Money",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 0H0V32H32V0Z" fill="#FF7900" />
        <path
          d="M12.5517 28.8955C12.1002 29.189 11.6035 29.3358 11.0843 29.3358C10.249 29.3358 9.76367 28.7827 9.76367 28.0377C9.76367 27.0444 10.678 26.5139 12.563 26.2994V26.0511C12.563 25.7238 12.3146 25.5432 11.8631 25.5432C11.4116 25.5432 11.0392 25.7238 10.7795 26.0511L9.98942 25.5996C10.4071 25.0239 11.0392 24.7305 11.8857 24.7305C13.0483 24.7305 13.703 25.2384 13.703 26.0511C13.703 26.0511 13.703 29.268 13.703 29.2793H12.6646L12.5517 28.8955ZM10.9037 27.9587C10.9037 28.2522 11.0956 28.5343 11.4342 28.5343C11.8067 28.5343 12.1566 28.3763 12.5178 28.0603V27.0105C11.4229 27.1573 10.9037 27.4282 10.9037 27.9587Z"
          fill="white"
        />
      </svg>
    ),
    step: ActiveVue.mobile,
  },
  {
    title: "Bank Card",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.75 14.5C15.3358 14.5 15 14.8358 15 15.25C15 15.6642 15.3358 16 15.75 16H18.25C18.6642 16 19 15.6642 19 15.25C19 14.8358 18.6642 14.5 18.25 14.5H15.75ZM2 8.25C2 6.45507 3.45507 5 5.25 5H18.75C20.5449 5 22 6.45507 22 8.25V15.75C22 17.5449 20.5449 19 18.75 19H5.25C3.45507 19 2 17.5449 2 15.75V8.25ZM20.5 9.5V8.25C20.5 7.2835 19.7165 6.5 18.75 6.5H5.25C4.2835 6.5 3.5 7.2835 3.5 8.25V9.5H20.5ZM3.5 11V15.75C3.5 16.7165 4.2835 17.5 5.25 17.5H18.75C19.7165 17.5 20.5 16.7165 20.5 15.75V11H3.5Z"
          fill="#111111"
        />
      </svg>
    ),
    step: ActiveVue.card,
  },
];

export const PaymentModelView = () => {
  const { close, isOpen } = useModal({
    eventName: ModalEventKey.ADD_PAYPMENT_METHOD,
  });
  const [activeIndex, setActiveIndex] = useState<{
    index: number;
    step: ActiveVue;
  }>({
    index: 0,
    step: ActiveVue.selectPayment,
  });
  const [step, setStep] = useState<ActiveVue>(ActiveVue.selectPayment);

  const handleSetActiveVue = (value?: ActiveVue) => {
    if (value) {
      setStep(value);
    } else {
      setStep(activeIndex.step);
    }
  };
  const handleActive = ({
    index,
    step,
  }: {
    index: number;
    step: ActiveVue;
  }) => {
    setActiveIndex({ step, index: index });
  };

  let content;

  switch (step) {
    case ActiveVue.card:
      content = (
        <div className="px-6 py-10 flex flex-col justify-between h-full  ">
          <div className="space-y-3">
            <div className="flex items-center gap-4 hover:opacity-60 hover:text-primar">
              <div onClick={() => handleSetActiveVue(ActiveVue.selectPayment)}>
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
              <h3 className="">Add Payment Method</h3>
            </div>
            {/* method */}
            <div className="pt-10 space-y-3">
              <div className="space-y-4">
                <Input label="Card Number" placeholder="Card Number" />
                <div className="flex gap-x-2">
                  <Input label="Expiry" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="CVC" />
                </div>
                <Input label="Adress" placeholder="Adress" />
              </div>
            </div>
          </div>

          <PrimaryButton type="button" onClick={() => handleSetActiveVue()}>
            Save Card
          </PrimaryButton>
        </div>
      );
      break;
    case ActiveVue.mobile:
      content = content = (
        <div className="px-6 py-10 duration-500 ease-out flex flex-col justify-between h-full  ">
          <div className="space-y-3">
            <div className="flex items-center gap-4 hover:opacity-60 hover:text-primary ">
              <div onClick={() => handleSetActiveVue(ActiveVue.selectPayment)}>
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
              <h3 className="">Add Payment Method</h3>
            </div>
            {/* method */}
            <div className="pt-10 space-y-3">
              <h4>Phome Number</h4>
              <div className="flex gap-x-2 w-full">
                <div>
                  <Input className="w-24 " placeholder="+237" />
                </div>
                <div className="w-full">
                  <Input placeholder="Hint text" />
                </div>
              </div>
            </div>
          </div>

          <PrimaryButton onClick={() => handleSetActiveVue()}>
            Save Momo
          </PrimaryButton>
        </div>
      );
      break;
    default:
      content = (
        <div className="px-6 py-10 flex flex-col justify-between h-full  ">
          <div className="space-y-3">
            <div
              onClick={() => close()}
              className="flex items-center gap-4 hover:opacity-60 hover:text-primar"
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
              <h3 className="">Add Payment Method</h3>
            </div>
            {/* method */}
            <div className="pt-10 space-y-3">
              {paymentMethods.map((method, index) => (
                <div
                  onClick={() =>
                    handleActive({ index: index, step: method.step })
                  }
                  key={index}
                  className={twMerge(
                    `flex items-center hover:cursor-pointer gap-x-3 border transition transform  ease-out ${
                      activeIndex.index === index &&
                      "bg-primaryAccent text-primary border-primary"
                    } h-[50px] px-3 duration-300  rounded-xl`
                  )}
                >
                  {method.icon}
                  <h3>{method.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <PrimaryButton onClick={() => handleSetActiveVue()}>
            Continue
          </PrimaryButton>
        </div>
      );
      break;
  }

  return (
    <RightModal close={close} isOpen={isOpen}>
      {content}
    </RightModal>
  );
};

import Avatar from "@/shared/generics/Avatar";
import { FC } from "react";
import { WithdrawlStatusButton } from "./WithdrawalStatusButton";

export enum PaymentType {
  Earning = "Earnings",
  withdrawal = "withdrawal",
}

type Props = {
  type: PaymentType;
};

export const PaymentItem: FC<Props> = ({ type }) => {
  return (
    <div  className="w-full h-[56px] px-2 grid grid-cols-5 duration-200 hover:bg-primaryAccent rounded-xl  items-center border-y ">
      <p>28,000 Frs</p>
      <p>Oct, 20, 2024</p>
      <p>MTN Momo</p>
      <div className="flex items-center">
        <Avatar
          className="h-6 w-6 text-[10px] "
          name="Sara Maya"
          isName={false}
        />
        <div className="flex flex-col -space-y-2 ml-1">
          <h4 className="text-[12px] text-grey ">from</h4>
          <h3>Sara Maya</h3>
        </div>
      </div>

      <div className="justify-self-end">
        <WithdrawlStatusButton status={type} />
      </div>
    </div>
  );
};

import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import { PaymentIcon } from "@/shared/generics/menu/icons/PaymentIcon";
import PaymentCard from "./components/PaymentCard";
import PaymentCard2 from "./components/PaymentCard2";
import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import { PaymentItem, PaymentType } from "./components/PaymentItem";
import { PaymentModelView } from "./PaymentModelView";
import { ModalEvents } from "@/shared/helpers/hooks/useModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { WithdrawModalView } from "./components/WithdrawModalView";

export const PaymentView = () => {
  return (
    <div>
      <div className="flex items-center gap-x-3 my-10">
        <PaymentIcon />
        <h2 className="font-medium">Payments</h2>
      </div>
      <div>
        <div className="h-[180px]  w-full rounded-xl border-2  p-4 flex justify-between  ">
          <div className="flex flex-col justify-between">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2V14.75C0 16.5449 1.45508 18 3.25 18H15.25C17.0449 18 18.5 16.5449 18.5 14.75V6.25C18.5 4.71321 17.4333 3.42555 16 3.08697V2.25C16 1.00736 14.9926 0 13.75 0H2.25C1.09186 0 0.138093 0.875013 0.0137322 2H0ZM2.25 3C1.83579 3 1.5 2.66421 1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H13.75C14.1642 1.5 14.5 1.83579 14.5 2.25V3H2.25ZM13.25 10H15.25C15.6642 10 16 10.3358 16 10.75C16 11.1642 15.6642 11.5 15.25 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75C12.5 10.3358 12.8358 10 13.25 10Z"
                fill="#FB7C37"
              />
            </svg>

            <div>
              <h1 className="text-3xl">28,000 Frs</h1>
              <h4 className="text-grey">Aviable for Withdrawal</h4>
            </div>
          </div>
          <div className="self-end">
            <PrimaryButton onClick={()=>ModalEvents.open(ModalEventKey.WITHDRAW_PAYMENT)} className="rounded-full">Withdraw</PrimaryButton>
          </div>
        </div>
      </div>
      {/* card */}
      <div className="mt-6 space-y-3 ">
        <h2 className="font-medium">Payment Methods</h2>
        {/* <div className="  rounded-3xl  "></div> */}
        <div className="flex justify-between">
          <PaymentCard />
          <PaymentCard2 />
          <div
            onClick={() => ModalEvents.open(ModalEventKey.ADD_PAYPMENT_METHOD)}
            className="h-[180px] hover:cursor-pointer hover:scale-105 duration-200 w-[360px] rounded-xl gap-x-2 p-4 shadow-lg text-black flex justify-center items-center font-semibold bg-gradient-to-r   bg-primaryAccent "
          >
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75008 0C9.12978 0 9.44363 0.282013 9.49337 0.648078L9.50024 0.749848L9.50144 8H16.7545C17.1687 8 17.5045 8.33579 17.5045 8.75C17.5045 9.1297 17.2224 9.44349 16.8563 9.49315L16.7545 9.5H9.50144L9.50349 16.7491C9.50357 17.1633 9.16785 17.4993 8.75364 17.4993C8.37394 17.4993 8.06009 17.2173 8.01035 16.8512L8.00349 16.7494L8.00144 9.5H0.752441C0.338228 9.5 0.00244141 9.16421 0.00244141 8.75C0.00244141 8.3703 0.284595 8.05651 0.650671 8.00685L0.752441 8H8.00144L8.00024 0.750152C8.00015 0.335939 8.33587 0 8.75008 0Z"
                  fill="#FB7C37"
                />
              </svg>
            </div>
            <h4 className="font-normal text-primary hover:cursor-pointer ">
              Add Payment Method
            </h4>
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <h3 className="font-medium" >Transaction</h3>
        <FilterBar
          labels={["All", "Earning", "Withdrawals"]}
          activeFilter="All"
          onFilter={() => {}}
          disableDisposition
        />
        <div>
          <PaymentItem type={PaymentType.Earning} />
          <PaymentItem type={PaymentType.withdrawal} />
          <PaymentItem type={PaymentType.Earning} />
          <PaymentItem type={PaymentType.Earning} />
          <PaymentItem type={PaymentType.Earning} />
          <PaymentItem type={PaymentType.withdrawal} />
          <PaymentItem type={PaymentType.Earning} />
        </div>
      </div>
      <PaymentModelView />
      <WithdrawModalView />
    </div>
  );
};

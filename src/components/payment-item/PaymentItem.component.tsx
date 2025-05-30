/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";

export enum PaymentType {
  Earning = "Earnings",
  withdrawal = "withdrawal",
}

export const PaymentItem = ({ type }: any) => {
  return (
    <div className="w-full h-[56px] px-2 grid grid-cols-5 duration-200 hover:bg-primaryAccent rounded-xl  items-center border-y ">
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
        <div className="flex items-center gap-x-2">
          <div
            className={twMerge(
              `  ${
                type === PaymentType.Earning
                  ? "bg-greenAccent text-green"
                  : "text-red bg-primaryAccent"
              }  h-[30px] px-2 flex justify-center items-center rounded-full `
            )}
          >
            <h4 className="">
              {type === PaymentType.Earning ? "Earnings" : "Withdrawal"}
            </h4>
          </div>
          <div>
            {type === PaymentType.Earning ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2461 21.0049C13.6603 21.0049 13.9961 20.6692 13.9961 20.2549C13.9961 19.8407 13.6603 19.5049 13.2461 19.5049H5.57699L20.7768 4.30517C21.0753 4.00659 21.0753 3.52251 20.7768 3.22393C20.4782 2.92536 19.9941 2.92536 19.6955 3.22393L4.49609 18.4234V10.7549C4.49609 10.3407 4.16031 10.0049 3.74609 10.0049C3.33188 10.0049 2.99609 10.3407 2.99609 10.7549V20.2549C2.99609 20.6692 3.33188 21.0049 3.74609 21.0049H13.2461Z"
                  fill="#18B760"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75069 0C7.33648 0 7.00069 0.335786 7.00069 0.75C7.00069 1.16421 7.33648 1.5 7.75069 1.5H15.4198L0.220025 16.6998C-0.07855 16.9983 -0.07855 17.4824 0.220025 17.781C0.5186 18.0796 1.00269 18.0796 1.30126 17.781L16.5007 2.58158V10.25C16.5007 10.6642 16.8365 11 17.2507 11C17.6649 11 18.0007 10.6642 18.0007 10.25V0.75C18.0007 0.335786 17.6649 0 17.2507 0H7.75069Z"
                  fill="#F1351B"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

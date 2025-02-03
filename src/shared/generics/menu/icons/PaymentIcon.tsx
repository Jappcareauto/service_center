import  { FC, SVGProps } from "react";

export const PaymentIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2V14.75C0 16.5449 1.45508 18 3.25 18H15.25C17.0449 18 18.5 16.5449 18.5 14.75V6.25C18.5 4.71321 17.4333 3.42555 16 3.08697V2.25C16 1.00736 14.9926 0 13.75 0H2.25C1.09186 0 0.138093 0.875013 0.0137322 2H0ZM2.25 3C1.83579 3 1.5 2.66421 1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H13.75C14.1642 1.5 14.5 1.83579 14.5 2.25V3H2.25ZM13.25 10H15.25C15.6642 10 16 10.3358 16 10.75C16 11.1642 15.6642 11.5 15.25 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75C12.5 10.3358 12.8358 10 13.25 10Z"
        fill="#111111"
      />
    </svg>
  );
};

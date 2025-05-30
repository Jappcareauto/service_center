import { FC, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

const ChevronArrowLeftIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      className={
        twMerge(
          'rotate-90',
          className,
        )
      }
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  );
};

export default ChevronArrowLeftIcon;
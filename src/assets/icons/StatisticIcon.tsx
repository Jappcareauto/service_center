import React from "react";

const StatisticIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.25 4.25C10.6642 4.25 11 4.58579 11 5V13H19C19.3797 13 19.6935 13.2822 19.7432 13.6482L19.75 13.75C19.75 18.7206 15.7206 22.25 10.75 22.25C5.77944 22.25 1.75 18.2206 1.75 13.25C1.75 8.27944 5.27944 4.25 10.25 4.25ZM13.25 1.75C18.2206 1.75 22.25 5.77944 22.25 10.75C22.25 11.1642 21.9142 11.5 21.5 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75V2.5C12.5 2.08579 12.8358 1.75 13.25 1.75Z"
        fill={props?.color ?? "currentColor"}
      />
    </svg>
  );
};

export default StatisticIcon;

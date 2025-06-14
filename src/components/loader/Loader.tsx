import { FC, HtmlHTMLAttributes } from "react";

const Loader: FC<HtmlHTMLAttributes<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      {...props}
      className="animate-spin h-6 w-6 text-primary"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#FB7C37"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="#FB7C37"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Loader;

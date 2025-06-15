import { ReactNode } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "tertiary"
    | "success"
    | "disabled";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const variantStyles = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-primary text-white hover:bg-primary/80",
  tertiary: "bg-transparent border border-black text-black hover:bg-gray-50",
  danger: "bg-red text-white hover:bg-red-600",
  success: "bg-green text-white hover:bg-green-600",
  disabled:
    "cursor-not-allowed text-gray-300 bg-white border border-gray-300 hover:bg-white",
};

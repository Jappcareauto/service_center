import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  close(): void;
  className?: string;
};
export const RightModal = ({ children, isOpen, close, className }: Props) => {
  return (
    <div className="">
      {isOpen && (
        <div
          onClick={() => close()}
          className={`modal z-50 fade fixed top-0 right-0 bottom-0 h-full min-h-screen w-full bg-opacity-30 bg-azmana-dark outline-none overflow-x-hidden overflow-y-auto`}
        ></div>
      )}
      <div
        className={
          twMerge(
            'fixed  top-0 right-0 w:full  bg-background h-full z-50  ease-in-out duration-500',
            'overflow-x-hidden overflow-y-auto w-[418px] scrollbar-thin scrollbar-thumb-azmana-gray-5 scrollbar-track-azmana-gray shadow-lg',
            isOpen ? "translate-x-0" : "-translate-x-[-420px]",
            className,
          )}
      >
        {children}
      </div>
    </div>
  );
};
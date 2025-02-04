import  { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  twBgcolor?: string;
  twBorderColor?: string;
};

export const SchulderCard: FC<Props> = ({ twBgcolor, twBorderColor }) => {
  return (
    <div
      className={twMerge(
        ` h-[100px] flex bg-primaryAccent border-primaryAccent2 justify-between w-full rounded-xl py-2 px-4 border-l-8 ${
          twBorderColor && twBorderColor
        }  ${twBgcolor && twBgcolor}  `
      )}
    >
      <div className=" space-y-1 ">
        <div className="gap-x-2 flex items-center  ">
          <img src="/cp.png" />
          <h4>James Mann</h4>
        </div>
        <h2>Bodyshop appointment</h2>
        <div className="">
          <h4>11:00 AM - 4:00 PM</h4>
        </div>
      </div>
      <h4>Porsche Taycan</h4>
    </div>
  );
};

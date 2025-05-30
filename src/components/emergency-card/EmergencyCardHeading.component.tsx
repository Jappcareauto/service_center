import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import React from "react";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import { EmergencyCardProps } from "./types";

const EmergencyCardHeading = ({
  data: { name, car, issue, cost, distance },
}: EmergencyCardProps) => {
  return (
    <div id="top" className="bg-primaryAccent">
      <div className="flex justify-between mb-7">
        <div className="flex gap-x-2">
          <BellIcon className="w-6 h-6 text-gray-800" />
          <h2 className="font-semibold text-gray-800">
            Emergency Assistance Request
          </h2>
        </div>
        <ChevronDownIcon className="w-6 h-6 text-gray-800" />
      </div>
      <Avatar name={name} nameClassName="font-normal" />
      <div className="justify-between items-center mt-3 flex flex-wrap">
        <div className="flex gap-x-3">
          <div className="border-r border-gray-300 pr-3">
            <p className="font-medium">{car}</p>
          </div>
          <div className="border-r border-gray-300 pr-3">
            <p className="font-medium">{issue}</p>
          </div>
          <div className="border-r border-gray-300 pr-3">
            <p className="font-medium">{cost}</p>
          </div>
          <div className="pr-3">
            <p className="font-medium">{distance}</p>
          </div>
        </div>
        <div className="flex gap-x-3 z-50">
          <Button className="bg-transparent text-black border border-black h-10 w-auto rounded-full">
            Decline
          </Button>
          <Button className="bg-black text-white h-10 rounded-full w-auto">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCardHeading;

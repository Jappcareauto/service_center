import LocationIcon from "@/assets/icons/LocationIcon";
import Avatar from "@/components/avatar/Avatar.component";
import DatePicker from "@/components/pickers/DatePicker.component";
import Switch from "@/components/switch/Switch.component";
import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const StatisticsProfile = () => {
  const [currentLabel] = useState("This Week");

  return (
    <div>
      <h2 className="font-medium mb-6">Export Data</h2>
      <Avatar name="" />
      <div className="flex flex-col gap-y-6">
        <div>
          <h2 className="font-bold">Service Provider</h2>
          <div className="flex items-center gap-x-4 text-primary mt-4">
            <div className="flex items-center gap-x-2">
              <LocationIcon />
              <span>Deido, Douala</span>
            </div>
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="flex items-center gap-x-2">
              <StarIcon />
              <span>4.75</span>
            </div>
          </div>
          <p className="mt-6 max-w-[340px]">
            Experience top-notch service at Japtech Auto shop, where we offer a
            wide range of basic car services to keep your vehicle running
            smoothly.
          </p>
        </div>
        <div>
          <h2 className="font-[600]">Select Data to Export</h2>
          <div className="flex flex-col gap-y-3 mt-4">
            <div className="flex items-center justify-between">
              <p>Revenue</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <p>Emergency Requests</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <p>Vin Reports</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <p>Appointments</p>
              <Switch />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-[600] ">Date Range</h2>
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {["This Week", "This Month", "YTD", "Custom"].map(
              (label, index) => {
                const isSelected = currentLabel === label;
                return (
                  <div
                    key={"date-range-item-" + index}
                    className={twMerge(
                      "rounded-full h-10 px-5 flex items-center justify-center cursor-pointer bg-primaryAccent text-black",
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-primaryAccent text-black"
                    )}
                  >
                    {label}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="flex gap-x-7 justify-between">
          <DatePicker label="From" />
          <DatePicker label="To" />
        </div>
      </div>
    </div>
  );
};

export default StatisticsProfile;

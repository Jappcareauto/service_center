import CalendarIcon from "@/assets/icons/CalendarIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon from "@/assets/icons/StarIcon";
import StatisticIcon from "@/assets/icons/StatisticIcon";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import LineChart from "@/components/line-chart/LineChart.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import React, { useState } from "react";
import StatComponent from "./StatsComponent";
import StatisticsProfile from "./StatisticsProfile";
import Drawer from "@/components/drawer/Drawer.component";

const Statistics = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Avatar name="" className="w-16 h-16" />
      <div className="flex items-end justify-between mt-4">
        <div>
          <h2 className="text-[22px]">Sample Autoshop</h2>
          <div className="flex items-center gap-x-4 text-primary mb-4">
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
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            onClick={() => setOpen(true)}
            className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
          >
            View Profile
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center my-6">
        <h2 className="font=-medium">Overview</h2>
        <Button className="rounded-full h-10 text-sm">Download Reports</Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <StatisticsCard
          title="Appointments"
          value="02"
          badgeTitle="In Progress"
          icon={<CalendarIcon className="text-primary" />}
          second
          titleClassName="text-primary"
        />
        <StatisticsCard
          title="Revenue"
          value="28,000 Frs"
          badgeTitle="This Week"
          icon={<StatisticIcon className="text-primary" />}
          second
          titleClassName="text-primary"
        />
      </div>
      <LineChart />
      <div>
        {/* <div className="flex items-center gap-x-2 mb-6">
          <StatisticIcon className="text-grey" />
          <h2 className="font-medium">Stats Breakdown by Category</h2>
        </div> */}
        <div className="flex justify-between w-full mb-4">
          <h2 className="font-medium">Appointment Stats</h2>
          <div className="text-sm rounded-2xl px-3 py-2 bg-grey3">
            This Week
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <StatComponent
            title="Total Revenue"
            value="65,000 Frs"
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title="Total Appointments"
            value="128"
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title="Completed Appointments"
            value="123"
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title="Canceled Appointments"
            value="05"
            icon={<CalendarIcon className="text-primary" />}
          />
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Appointment Details"
      >
        <StatisticsProfile />
      </Drawer>
    </div>
  );
};

export default Statistics;

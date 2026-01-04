/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/button/Button.component";
import CalendarCard from "@/components/calendars/CalendarCard.component";
import CalendarFull from "@/components/calendars/CalendarFull.component";
import BarChart from "@/components/charts/BarChart.component";
import { dayMap, weekDays } from "@/constants";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAppointmentsQuery,
  useGetAppointmentStatsByDateMutation,
} from "@/redux/api";
import { BarChartItemType, DateRange } from "@/types";
import { useState } from "react";

const CalendarView = () => {
  const { data, isLoading } = useGetAppointmentsQuery(undefined);
  const [weeklyStats, setWeeklyStats] = useState<BarChartItemType[]>([]);
  const [getAppointmentStats, { isLoading: statsLoading }] =
    useGetAppointmentStatsByDateMutation();

  const handleAppointmentStats = (startDate: string, endDate: string) => {
    const data = {
      startDate,
      endDate,
      range: "WEEK" as DateRange,
    };
    getAppointmentStats(data)
      .unwrap()
      .then((res) => {
        if (res?.data.currentStats) {
          const formattedStats = weekDays.map((day: string) => ({
            name: dayMap[day as keyof typeof dayMap],
            value:
              res?.data.currentStats[
                day as keyof typeof res.data.currentStats
              ] || 0,
          }));
          setWeeklyStats(formattedStats);
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex w-full gap-x-8">
          <div className="w-full bg-primaryAccent rounded-xl p-4 flex flex-col justify-between">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <BarChart
                  data={weeklyStats}
                  title="Weekly Appointments"
                  onSelect={(start, end) => handleAppointmentStats(start, end)}
                  isLoading={statsLoading}
                  className="h-[170px]"
                />
              </div>
            )}

            <div className="flex justify-between items-center">
              <h3>Calendar</h3>
              <Button className=" rounded-full bg-background text-primary ">
                Week
              </Button>
            </div>
          </div>
          <CalendarCard
            fullscreen={false}
            wrapperStyle={{
              width: 650,
            }}
          />
        </div>
        <div className="mt-8">
          <CalendarFull data={data?.data as any} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarView;

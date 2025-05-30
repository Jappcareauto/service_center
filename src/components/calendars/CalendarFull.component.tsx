/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment, AppointmentsResponse } from "@/types";
import type { CalendarProps } from "antd";
import { Calendar, ConfigProvider } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { FC } from "react";
import { useNavigate } from 'react-router-dom';

const CalendarFull: FC<AppointmentsResponse> = ({ data }) => {
    const navigate = useNavigate()
  const getListData = (value: Dayjs) => {
    const listData = data
    ?.filter((event: Appointment) => dayjs(event.date).isSame(value, "day"))
    .map((event: any) => ({
      status: event.status,
      timeOfDay: event.timeOfDay,
      locationType: event.locationType,
      service: event.service.title,
      id: event.id
    }))
    return listData;
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <div className="flex flex-col gap-y-2">
        {listData?.map((item, index) => (
          <button
            key={index}
            className="text-xs gap-y-2 flex flex-col mb-2 text-left"
            onClick={() => navigate(`/appointment/${item.id}`)}
          >
            <div className="bg-primaryAccent rounded-md p-2">
              <strong>Service:</strong> {item.service}
            </div>
            {item.status && (
              <div className="bg-purple-50 rounded-md p-2">
                <strong>Status:</strong> {item.status}
              </div>
            )}
            <div className="rounded-md p-2 bg-green-200">
              <strong>Time:</strong> {item.timeOfDay}
            </div>
            <div className="rounded-md p-2 bg-gray-100">
              <strong>Location:</strong> {item.locationType}
            </div>
            {index !== listData?.length - 1 && <div className='h-1 bg-gray-400 rounded-full' />}
          </button>
        ))}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return null;
    return info.originNode;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "#FFEDE6",
        },
        components: {
          Calendar: {
            itemActiveBg: "#ffcab6",
            fullPanelBg: "transparent",
            fullBg: "transparent",
          },
        },
      }}
    >
      <Calendar cellRender={cellRender} className="bg-transparent" />
    </ConfigProvider>
  );
};
export default CalendarFull;

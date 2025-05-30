import ChevronArrowLeftIcon from "@/assets/icons/ChevronArrowLeftIcon";
import ChevronArrowRightIcon from "@/assets/icons/ChevronArrowRightIcon";
import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { CalendarTypes } from "./types";

// const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//   console.log(value.format("YYYY-MM-DD"), mode);
// };

const wStyle: React.CSSProperties = {
  borderRadius: 10,
};

const CalendarCard = ({ wrapperStyle = wStyle, ...props }: CalendarTypes) => {
  const currentYear = dayjs().year();

  const disabledDate = (date: dayjs.Dayjs) => {
    return date.year() !== currentYear;
  };

  return (
    <div style={wrapperStyle}>
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              itemActiveBg: "#FB7C37",
              fullPanelBg: "transparent",
            },
          },
        }}
      >
        <Calendar
          // fullCellRender={cellRender}
          className="bg-transparent"
          defaultValue={dayjs()}
          disabledDate={disabledDate}
          headerRender={({ value, onChange }) => {
            const prevMonth = () => {
              if (value.month() > 0) {
                onChange(value.clone().month(value.month() - 1));
              }
            };

            const nextMonth = () => {
              if (value.month() < 11) {
                onChange(value.clone().month(value.month() + 1));
              }
            };

            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className='py-2'
              >
                <h1 className="font-bold text-primary">
                  {value.format("ddd, MMM D, YYYY")}
                </h1>
                <div className="flex gap-x-7">
                  <button onClick={prevMonth} className="hover:opacity-70">
                    <ChevronArrowLeftIcon />
                  </button>
                  <button onClick={nextMonth} className="hover:opacity-70">
                    <ChevronArrowRightIcon />
                  </button>
                </div>
              </div>
            );
          }}
          {...props}
        />
      </ConfigProvider>
    </div>
  );
};
export default CalendarCard;

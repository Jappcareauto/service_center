import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import ChevronArrowLeftIcon from "../../icons/ChevronArrowLeftIcon";
import ChevronArrowRightIcon from "../../icons/ChevronArrowRightIcon";
import { DateType, OnChangedReturnType, useDatePicker } from "./useDatePicker";


interface OwnProps<Range extends boolean> {
  date?: DateType<Range>,
  firstDate?: Date,
  lastDate?: Date,
  minDate?: string,
  onChanged?: (date: OnChangedReturnType<Range>) => void;
  range?: Range;
  className?: string,
}

const DatePicker = <Range extends boolean>
  (props: OwnProps<Range>) => {
  const { className, minDate, ...otherProps } = props;
  const {
    hasCurrentDaySelected,
    hasDaySelect,
    currentDate,
    handlePreviousDate,
    handleNextDate,
    calendarDays,
    hasUserSelectedDate,
    handleSelectDate,
    getDisplayDayNumber,
    dateIsInTheRange,
    hasLastRangeSelected,
    hasFirstRangeSelected,
  } = useDatePicker(otherProps);

  const isPreviewActionEnabled = (): boolean => {
    // const previousMonth = currentDate.subtract(1, 'month');
    // const previewLastDayInMonth = dayjs(`${previousMonth.year()}-${previousMonth.month()+1}-${previousMonth.daysInMonth()} 23:59:59`);
    return true;
  };

  const isDateDisabled = (date?: Date): boolean => {
    if (!date || !minDate) return false;
    const currentDate = dayjs(date)
    currentDate.hour(23);
    currentDate.minute(59);
    currentDate.second(59);
    currentDate.millisecond(59);
    const minDateJs = dayjs(new Date(minDate));
    minDateJs.hour(23);
    minDateJs.minute(59);
    minDateJs.second(59);
    minDateJs.millisecond(59);
    return currentDate.isBefore(minDateJs, 'day');
  };

  return (
    <div className={twMerge(
      "rounded-xl bg-white w-[250px] p-2 pt-3 select-none",
      className,
    )}>
      <div className="flex justify-between items-center">
        <div className="text-black font-medium w-full pl-2">
          {currentDate}
        </div>
        <button
          type={"button"}
          disabled={!isPreviewActionEnabled()} onClick={handlePreviousDate}>
          <ChevronArrowLeftIcon className={twMerge(
            "w-8 text-azmana-dark",
            isPreviewActionEnabled() ? "" : "text-azmana-gray-4"
          )}
          />
        </button>
        <button
          type={"button"}
          onClick={handleNextDate}
        >
          <ChevronArrowRightIcon
            className="w-8 cursor-pointer text-azmana-dark"
          />
        </button>
      </div>
      <div className="mt-2 mb-1">
        <ul
          className="text-[11px] grid grid-cols-7   py-1 select-none rounded text-center w-full"
        >
          <li>DIM</li>
          <li>LUN</li>
          <li>MAR</li>
          <li>MER</li>
          <li>JEU</li>
          <li>VEN</li>
          <li>SAM</li>
        </ul>
      </div>
      <div className="grid grid-cols-7">
        {
          calendarDays.map((date, index) => {
            return <div
              key={'day_key_'.concat(index.toString())}
              className={
                twMerge(
                  "flex items-center justify-center py-1",
                  !date ? "bg-transparent" : "",
                  dateIsInTheRange(date) ? "bg-calendarRangeBgColor" : "",
                  hasFirstRangeSelected(date) ? "rounded-l-full" : "",
                  hasLastRangeSelected(date) ? "rounded-r-full" : "",
                )
              }
            >
              <button
                type={"button"}
                disabled={!date || isDateDisabled(date)}
                onClick={(_) => {
                  _.stopPropagation();
                  _.preventDefault();
                  handleSelectDate(date!);
                }}
                className={
                  twMerge(
                    'text-black rounded-full h-6 w-6 flex border border-transparent',
                    'justify-center items-center text-sm',
                    hasDaySelect(date) ?
                      "font-medium bg-primary text-white" :
                      hasCurrentDaySelected(date) ?
                        "border-primary font-medium text-primary" :
                        hasCurrentDaySelected(date)
                          && hasUserSelectedDate ? "border border-primary font-medium" : "",
                    isDateDisabled(date) ? "bg-gray-100 text-gray-400" : ""
                  )
                }>
                {
                  getDisplayDayNumber(date)
                }
              </button>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default DatePicker;

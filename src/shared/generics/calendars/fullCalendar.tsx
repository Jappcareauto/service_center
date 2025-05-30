import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { DateType, OnChangedReturnType, useDatePicker } from '../layouts/date-picker/useDatePicker';
import ChevronArrowLeftIcon from '../icons/ChevronArrowLeftIcon';

interface Event {
  id: string;
  title: string;
  date: string; // Date in YYYY-MM-DD format
}

interface OwnProps<Range extends boolean> {
  date?: DateType<Range>;
  firstDate?: Date;
  lastDate?: Date;
  minDate?: string;
  onChanged?: (date: OnChangedReturnType<Range>) => void;
  range?: Range;
  className?: string;
  events?: Event[]; // Add events prop
}

const Calendar = <Range extends boolean>(props: OwnProps<Range>) => {
  const { className, minDate, events = [], ...otherProps } = props;
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
    return true;
  };

  const isDateDisabled = (date?: Date): boolean => {
    if (!date || !minDate) return false;
    const currentDate = dayjs(date)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(59);
    const minDateJs = dayjs(new Date(minDate))
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(59);
    return currentDate.isBefore(minDateJs, 'day');
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter((event) => dayjs(event.date).isSame(date, 'day'));
  };

  return (
    <div className={twMerge(
      "rounded-xl bg-white w-[300px] p-2 pt-3 select-none",
      className,
    )}>
      <div className="flex justify-between items-center">
        <div className="text-black font-medium w-full pl-2">
          {dayjs(currentDate).format('MMMM YYYY')}
        </div>
        <button
          type={"button"}
          disabled={!isPreviewActionEnabled()}
          onClick={handlePreviousDate}
        >
          <ChevronArrowLeftIcon className={twMerge(
            "w-8 text-azmana-dark",
            isPreviewActionEnabled() ? "" : "text-azmana-gray-4"
          )} />
        </button>
        <button
          type={"button"}
          onClick={handleNextDate}
        >
          <ChevronArrowLeftIcon
            className="w-8 cursor-pointer text-azmana-dark"
          />
        </button>
      </div>
      <div className="mt-2 mb-1">
        <ul className="text-[11px] grid grid-cols-7 py-1 select-none rounded text-center w-full">
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
        {calendarDays.map((date, index) => {
          const eventsForDate = date ? getEventsForDate(date) : [];
          return (
            <div
              key={'day_key_'.concat(index.toString())}
              className={twMerge(
                "flex flex-col items-center justify-center py-1",
                !date ? "bg-transparent" : "",
                dateIsInTheRange(date) ? "bg-calendarRangeBgColor" : "",
                hasFirstRangeSelected(date) ? "rounded-l-full" : "",
                hasLastRangeSelected(date) ? "rounded-r-full" : "",
              )}
            >
              {date && (
                <>
                  <button
                    type={"button"}
                    disabled={!date || isDateDisabled(date)}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSelectDate(date!);
                    }}
                    className={twMerge(
                      'text-black rounded-full h-6 w-6 flex border border-transparent',
                      'justify-center items-center text-sm',
                      hasDaySelect(date)
                        ? "font-medium bg-primary text-white"
                        : hasCurrentDaySelected(date)
                          ? "border-primary font-medium text-primary"
                          : hasCurrentDaySelected(date) && hasUserSelectedDate
                            ? "border border-primary font-medium" : "",
                      isDateDisabled(date) ? "bg-gray-100 text-gray-400" : ""
                    )}
                  >
                    {getDisplayDayNumber(date)}
                  </button>
                  {/* Render events for the date */}
                  <div className="mt-1 space-y-1">
                    {eventsForDate.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs text-gray-600 bg-gray-100 px-1 rounded"
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
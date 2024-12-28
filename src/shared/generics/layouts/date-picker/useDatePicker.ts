import { useState } from "react";

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
  "Octobre", "Novembre", "Décembre"];


export type SingleDate = Date;
export type DateRange = { startDate: Date; endDate?: Date };
export type OnChangedReturnType<Range extends boolean> = Range extends true ? DateRange : SingleDate;
export type DateType<Range extends boolean> = Range extends true ? DateRange : SingleDate;

export interface DatePickerBehavior {
  handleSelectDate: (date: Date) => void;
  hasCurrentDaySelected: (day?: Date) => boolean;
  hasUserSelectedDate: boolean;
  hasDaySelect: (day?: Date) => boolean;
  getDisplayDayNumber: (date?: Date) => string;
  calendarDays: Array<Date | undefined>;
  currentDate: string;
  handleNextDate: () => void;
  handlePreviousDate: () => void;
  dateIsInTheRange: (date?: Date) => boolean;
  hasFirstRangeSelected: (date?: Date) => boolean;
  hasLastRangeSelected: (date?: Date) => boolean;
}

interface OwnProps<Range extends boolean> {
  date?: DateType<Range>,
  firstDate?: Date,
  lastDate?: Date,
  onChanged?: (date: OnChangedReturnType<Range>) => void;
  range?: Range;
}

export const useDatePicker = <Range extends boolean>
  (
    {
      range,
      date,
      onChanged,
    }: OwnProps<Range>)
  : DatePickerBehavior => {

  const getInitialDate = <Range extends boolean>(initialDate?: DateType<Range>, range?: boolean): Date => {
    if (initialDate) {
      return range ? (initialDate as DateRange).startDate : initialDate as Date;
    }
    return new Date();
  }

  const initialDateManagement = getInitialDate(date, range);

  const [currentDate, setCurrentDate] = useState(initialDateManagement);

  const [selectDate, setSelectDate] = useState(date);


  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isSameDay = (day1?: Date, day2?: Date): boolean => {
    if (!day1 || !day2) return false;
    return day1.getFullYear() == day2.getFullYear()
      && day1.getMonth() == day2.getMonth()
      && day1.getDate() === day2.getDate()
  }

  const handleChangedDateRange = (date: Date) => {
    const dateRange = selectDate as DateRange | undefined;
    if (!dateRange?.startDate || dateRange.startDate && dateRange.endDate) {
      setSelectDate({ startDate: date } as DateType<Range>);
      return;
    }
    const startDate = dateRange.startDate;
    const endDate = date;
    let newDateRange: DateType<Range>;
    if (startDate > endDate) {
      newDateRange = { startDate: endDate, endDate: startDate } as DateType<Range>;
    } else {
      newDateRange = { startDate, endDate } as DateType<Range>;
    }
    setSelectDate(newDateRange);
    onChanged?.(newDateRange);
  }

  const handleSelectDate = (date: Date) => {
    if (range) {
      return handleChangedDateRange(date);
    }
    const newDate = date as DateType<Range>;
    setSelectDate(newDate);
    onChanged?.(newDate);
  }

  const dateIsInTheRange = (date?: Date): boolean => {
    if (!range || !date) return false;
    const dateRange = selectDate as DateRange;
    if (!dateRange?.endDate) return false;
    return date >= dateRange.startDate && date <= dateRange.endDate;
  }

  const hasCurrentDaySelected = (day?: Date): boolean => {
    const currentDay = new Date();
    return isSameDay(currentDay, day);
  }

  const hasDaySelect = (day?: Date): boolean => {
    if (!day) return false;

    if (!selectDate) {
      return isSameDay(day, new Date());
    }

    if (range) {
      const dateRange = selectDate as DateRange;
      return isSameDay(day, dateRange.startDate) || isSameDay(day, dateRange.endDate);
    }
    return isSameDay(day, selectDate as SingleDate);
  }

  const getDateDayWithDayNumber = (year: number, month: number, day: number): Date => {
    const date = year + '-' + month + '-' + day;
    return new Date(date);
  }

  const getDisplayDayNumber = (date?: Date) => {
    return date?.getDate().toString() ?? '';
  }

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const getDayNumberFromDate = (date?: Date): number => {
    if (!date) return 0;
    return date.getDay();
  }

  const getCalendarDays = (): Array<Date | undefined> => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDateInMonth = getDayNumberFromDate(getDateDayWithDayNumber(year, month, 1));
    return new Array(daysInMonth + firstDateInMonth)
      .fill(0)
      .map((_, index): Date | undefined => {
        if (firstDateInMonth > index) {
          return undefined;
        }
        return getDateDayWithDayNumber(year, month, index + 1 - firstDateInMonth);
      });
  }

  const subtractMonth = (date: Date): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() - 1);
    if (date.getDate() !== result.getDate()) {
      result.setDate(0);
    }
    return result;
  }

  const addMonth = (date: Date): Date => {
    const result = new Date(date);
    const currentMonth = result.getMonth();
    result.setMonth(currentMonth + 1);

    if (result.getMonth() !== (currentMonth + 1) % 12) {
      result.setDate(0);
    }
    return result;
  }

  const handlePreviousDate = () => {
    setCurrentDate(subtractMonth(currentDate))
  }
  const handleNextDate = () => {
    setCurrentDate(addMonth(currentDate));
  }

  const hasFirstRangeSelected = (date?: Date): boolean => {
    const dateRange = selectDate as DateRange;
    if (!dateRange?.startDate) return false;
    return isSameDay(date, dateRange.startDate);
  }
  const hasLastRangeSelected = (date?: Date): boolean => {
    const dateRange = selectDate as DateRange;
    if (!dateRange?.endDate) return false;
    return isSameDay(date, dateRange.endDate);
  }

  return {
    handleSelectDate,
    hasCurrentDaySelected,
    hasDaySelect,
    getDisplayDayNumber,
    calendarDays: getCalendarDays(),
    currentDate: `${MONTHS[currentMonth]} ${currentYear}`,
    handleNextDate,
    handlePreviousDate,
    hasUserSelectedDate: false,
    dateIsInTheRange,
    hasLastRangeSelected,
    hasFirstRangeSelected,
  }
}
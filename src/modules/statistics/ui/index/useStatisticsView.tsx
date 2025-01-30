import { useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";
import { findAllAppointmentStatsAsync } from "../../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsAsync";
import { calculateRange } from "../../utils/calculStatsRange";
import { StatsRange } from "../../models/statsRanche";

function useStatisticsView() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const range = calculateRange(StatsRange.MONTH);
    dispatch(findAllAppointmentStatsAsync(range))
      .unwrap()
      .then((result) => console.log("result", result));
  });

  return;
}

export default useStatisticsView;

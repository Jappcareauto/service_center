import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppointementSelector } from "@/modules/appointment/slices/AppointenmentSelector";
import { useFindAllAppointment } from "@/modules/appointment/useCase/findAll/useFindAllAppointment";
import { StatsRange } from "@/modules/statistics/models/statsRanche";
import { findAllAppointmentStatsAsync } from "@/modules/statistics/usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsAsync";
import { calculateRange } from "@/modules/statistics/utils/calculStatsRange";
import { getErrorState } from "@/shared/errors/getErrorState";
import { useEffect } from "react";

export const useDashboardView = () => {
  //dispatch Action
  const dispatch = useAppDispatch();
  //state
  const {
    state: { appointments, loading },
  } = useFindAllAppointment();
  const activeAppointment = useAppSelector((state) =>
    AppointementSelector.activeAppointment(state)
  );
  const fetchData = async () => {
    try {
      const dataRange = calculateRange(StatsRange.MONTH);
      await dispatch(findAllAppointmentStatsAsync(dataRange)).unwrap();
    } catch (err) {
      const error = getErrorState(err);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    // const fetchByInterval = setInterval(() => {}, 5 * 60 * 60);
  }, []);

  return {
    appointments,
    loading,
    activeAppointment,
  };
};

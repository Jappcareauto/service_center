import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppointementState } from "@/modules/appointment/slices/AppointenmentSelector";
import { findAllAppointmentAsync } from "@/modules/appointment/useCase/findAll/findAllAppointmentAsync";
import { StatsRange } from "@/modules/statistics/models/statsRanche";
import { findAllAppointmentStatsAsync } from "@/modules/statistics/usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsAsync";
import { calculateRange } from "@/modules/statistics/utils/calculStatsRange";
import { getErrorState } from "@/shared/errors/getErrorState";
import { useEffect } from "react";

export const useDashboardView = () => {
  //dispatch Action
  const dispatch = useAppDispatch();
  //state
  const appointments = useAppSelector(AppointementState.appointments);
  const loading = useAppSelector(AppointementState.loading);
  const pagination = useAppSelector(AppointementState.pagination);

  const fetchData = async () => {
    try {
      const dataRange = calculateRange(StatsRange.MONTH);
      await dispatch(findAllAppointmentStatsAsync(dataRange)).unwrap();
      await dispatch(findAllAppointmentAsync()).unwrap();
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
    pagination,
  };
};

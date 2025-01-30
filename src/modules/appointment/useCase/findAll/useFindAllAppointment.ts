import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppointementSelector } from "../../slices/AppointenmentSelector";
import { useEffect } from "react";
import { findAllAppointmentAsync } from "./findAllAppointmentAsync";

export const useFindAllAppointment = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(AppointementSelector.appointmentWithAll);
  console.log("appointments", appointments);
  const loading = useAppSelector(AppointementSelector.loading);

  const fetchData = async () => {
    await dispatch(findAllAppointmentAsync()).unwrap();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    state: { appointments, loading },
  };
};

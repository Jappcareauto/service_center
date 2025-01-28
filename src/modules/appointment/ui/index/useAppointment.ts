import { useAppSelector } from "@/app/hooks";
import { useFindAllAppointment } from "../../useCase/findAll/useFindAllAppointment";
import { AppointementSelector } from "../../slices/AppointenmentSelector";

export const useAppointement = () => {
  //appointmentsStates
  const {
    state: { appointments, loading },
  } = useFindAllAppointment();
  const ActiveAppointment = useAppSelector((state) =>
    AppointementSelector.activeAppointment(state)
  );

  return {
    loading,
    appointments,
    ActiveAppointment,
  };
};

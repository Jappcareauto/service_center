import { useAppSelector } from "@/app/hooks";
import { useFindAllAppointment } from "../../useCase/findAll/useFindAllAppointment";
import { AppointementSelector } from "../../slices/AppointenmentSelector";
import { useFilterAppointment } from "@/shared/slice/useFilterAppointment";

export const useAppointement = () => {
  const { action, state } = useFilterAppointment();

  const {
    state: { appointments, loading },
  } = useFindAllAppointment();
  const ActiveAppointment = useAppSelector((state) =>
    AppointementSelector.activeAppointment(state)
  );

  return {
    state: {
      loading,
      appointments,
      ActiveAppointment,
      activeFilter: state.filter,
    },
    action: {
      ...action,
    },
  };
};

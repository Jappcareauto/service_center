import { useAppSelector } from "@/app/hooks";
// import { vehicleState } from "@/modules/vehicle/slice/vehicleSelector";
import { AppointementState } from "../../slices/AppointenmentSelector";
import { formatDate } from "@/shared/utils/dateFormat";

const useAppointementDetail = () => {
  const activeAppointment = useAppSelector(AppointementState.activeAppointment);

  const loading = useAppSelector(AppointementState.loading);

  const formattedDate = formatDate(activeAppointment?.date ?? "");
  return {
    activeAppointment: { ...activeAppointment, date: formattedDate },
    loading,
  };
};

export default useAppointementDetail;

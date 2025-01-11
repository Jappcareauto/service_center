import { useAppSelector } from "@/app/hooks";
import { AppointementState } from "../../slices/AppointenmentSelector";
import { formatDateToMedium } from "@/shared/utils/dateFormat";

const useAppointementDetail = () => {
  const activeAppointment = useAppSelector(AppointementState.activeAppointment);
 

  const loading = useAppSelector(AppointementState.loading);
  const formattedDate = formatDateToMedium(activeAppointment?.date ?? "");

  return {
    activeAppointment: { ...activeAppointment, date: formattedDate },
    loading,
  };
};

export default useAppointementDetail;

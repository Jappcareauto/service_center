import { useAppSelector } from "@/app/hooks";
import { AppointementState } from "@/modules/appointment/slices/AppointenmentSelector";

export const useDashboardView = () => {
  const appointments = useAppSelector(AppointementState.appointments);
  const loading = useAppSelector(AppointementState.loading);
  const pagination = useAppSelector(AppointementState.pagination);

  return {
    appointments,
    loading,
    pagination,
  };
};

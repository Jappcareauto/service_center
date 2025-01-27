import {
  // useAppDispatch,
  useAppSelector,
} from "@/app/hooks";
import { AppointementState } from "../../slices/AppointenmentSelector";
import { formatDateToMedium } from "@/shared/utils/dateFormat";
import { useNavigate } from "react-router-dom";
// import { appointmentSliceAction } from "../../slices/AppointementSlice";

const useAppointementDetail = () => {
  const activeAppointment = useAppSelector(AppointementState.activeAppointment);
  // const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const loading = useAppSelector(AppointementState.loading);
  const formattedDate = formatDateToMedium(activeAppointment?.date ?? "");

  const handleNavigation = (link: string) => {
    navigate(link);
  };
  return {
    state: {
      activeAppointment: { ...activeAppointment, date: formattedDate },
      loading,
    },
    action: {
      handleNavigation,
    },
  };
};

export default useAppointementDetail;

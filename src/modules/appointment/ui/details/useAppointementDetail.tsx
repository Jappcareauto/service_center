import {
  // useAppDispatch,
  useAppSelector,
} from "@/app/hooks";
import { AppointementSelector } from "../../slices/AppointenmentSelector";
import { formatDateToMedium } from "@/shared/utils/dateFormat";
import { useNavigate } from "react-router-dom";
// import { appointmentSliceAction } from "../../slices/AppointementSlice";

const useAppointementDetail = () => {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const appointment = useAppSelector((state) =>
    AppointementSelector.activeAppointment(state)
  );

  const loading = useAppSelector(AppointementSelector.loading);
  const formattedDate = formatDateToMedium(appointment?.date);

  const handleNavigation = (link: string) => {
    navigate(link);
  };
  return {
    state: {
      activeAppointment: { ...appointment, date: formattedDate },
      loading,
    },
    action: {
      handleNavigation,
    },
  };
};

export default useAppointementDetail;

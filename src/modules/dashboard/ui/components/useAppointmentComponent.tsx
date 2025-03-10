import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Appointment } from "@/modules/appointment/model/Appointment";
import { appointmentSliceAction } from "@/modules/appointment/slices/AppointementSlice";
import { AppointementSelector } from "@/modules/appointment/slices/AppointenmentSelector";
// import { findAllAppointment } from "@/modules/appointment/useCase/findAll/findAllAppointment";
// import { vehicleState } from "@/modules/vehicle/slice/vehicleSelector";
import { formatDateToMedium } from "@/shared/utils/dateFormat";

type Props = {
  appointment: Appointment;
};

const useAppointmentComponent = ({ appointment }: Props) => {
  //redux state and  dispatch
  const dispatch = useAppDispatch();
  // const activeVehicle = useAppSelector(vehicleState.activeVehicle);
  // const vehicleLoading = useAppSelector(vehicleState.loading);
  const activeAppointment = useAppSelector(
    AppointementSelector.activeAppointment
  );

  //format date
  const date = formatDateToMedium(appointment?.date || "");
  //handle fetch one appointment

  const handleSectActiveAppointment = () => {
    dispatch(
      appointmentSliceAction.setActiveAppointmentById({
        appointment,
      })
    );
  };

  return {
    appointment: { ...appointment, date },
    activeAppointment,
    // vehicleState: { activeVehicle, vehicleLoading },
    handleSectActiveAppointment,
  };
};

export default useAppointmentComponent;

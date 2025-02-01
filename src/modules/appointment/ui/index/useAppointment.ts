import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { findAllAppointmentAsync } from "../../useCase/findAll/findAllAppointmentAsync";
import { AppointementState } from "../../slices/AppointenmentSelector";
// import { vehicleState } from "@/modules/vehicle/slice/vehicleSelector";
// import { LoadingState } from "@/shared/enums/LoadingState";
// import { useSelector } from "react-redux";
// import { vehicleState } from "@/modules/vehicle/slice/vehicleSelector";
// import { appointmentSliceAction } from "../../slices/AppointementSlice";

export const useAppointement = () => {
  const dispatch = useAppDispatch();
  //appointmentsStates
  const loading = useAppSelector(AppointementState.loading);
  const appointments = useAppSelector(AppointementState.appointments);
  const pagination = useAppSelector(AppointementState.pagination);
  //vehiclesStates
  // const vehicles = useSelector(vehicleState.vehicles) ;
  // const allVehicleLoading = useAppSelector(vehicleState.allVehicleLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch actions sequentially
        await dispatch(findAllAppointmentAsync()).unwrap();
      } catch (err) {
        console.error("Error fetching appointments and vehicles:", err);
      }
    };

    fetchData();
  }, []);
  

  return {
    loading,
    appointments,
    pagination,
  };
};

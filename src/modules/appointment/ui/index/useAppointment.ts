import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { findAllAppointment } from "../../useCase/findAll/findAllAppointmentAsync";
import { AppointementState } from "../../slices/AppointenmentSelector";
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
  // const allVehicleLoading = useSelector(vehicleState.allVehicleLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch actions sequentially
        const response = await dispatch(findAllAppointment()).unwrap();
        console.log("respondddddse", response);
        // Update appointments with vehicle data
        // const updatedAppointments = appointments.map((appointment) => {
        //   const vehicle = vehicles.find(
        //     (vehicle) => vehicle.id === appointment.vehicleId
        //   );

        //   return {
        //     ...appointment,
        //     vehicle,
        //   };
        // });
        // Dispatch updated appointments to the store
        // dispatch(
        //   appointmentSliceAction.updateAppointments({
        //     appointments,
        //   })
        // );
      } catch (err) {
        console.error("Error fetching appointments and vehicles:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  return {
    loading,
    appointments,
    pagination,
  };
};

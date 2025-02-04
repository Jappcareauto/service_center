import { UpdateAppointmentStatusComand } from "./updateAppointmentStatusCommand";
import { useAppDispatch } from "@/app/hooks";
import { updateAppointmentStatusAsync } from "./updateAppointmentStatusAsync";
import { useState } from "react";
import { LoadingState } from "@/shared/enums/LoadingState";
import { Appointment } from "@/modules/appointment/model/Appointment";

export const useUpdateAppointmentStatus = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<LoadingState>(LoadingState.idle);
  const [data, setData] = useState<Appointment>();

  const onUpdateStatus = async (command: UpdateAppointmentStatusComand) => {
    try {
      setLoading(LoadingState.pending);
      const response = await dispatch(
        updateAppointmentStatusAsync(command)
      ).unwrap();
      setData(response);
      setLoading(LoadingState.success);
      console.log('responselqkdjflkdsjfl', response)
    } catch (error) {
        setLoading(LoadingState.failed)
      console.log("error", error);
    }
  };
  return {
    state: { appointment: data, loading },
    action: {
      onUpdateStatus,
    },
  };
};

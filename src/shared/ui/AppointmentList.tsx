import { Appointment } from "@/modules/appointment/model/Appointment";
import AppointmentComponent from "@/modules/dashboard/ui/components/AppointmentComponent";
import { FC } from "react";
import { LoadingState } from "../enums/LoadingState";
import Loader from "../generics/loader/Loader";

interface Props {
  appointments: Appointment[] | undefined;
  loading: LoadingState;
}

const AppointmentList: FC<Props> = ({ appointments, loading }) => {
  switch (loading) {
    case LoadingState.pending:
      return (
        <div className="mx-auto">
          <Loader />
        </div>
      );
    case LoadingState.failed:
      return (
        <div>
          <p className="text-4xl mx-auto text-center mt-5">failed to load data</p>
          
        </div>
      );

    case LoadingState.success:
      return appointments?.map((appointment) => (
        <AppointmentComponent appointment={appointment} key={appointment.id} />
      ));

    default:
      return appointments?.map((appointment) => (
        <AppointmentComponent appointment={appointment} key={appointment.id} />
      ));
  }
};

export default AppointmentList;

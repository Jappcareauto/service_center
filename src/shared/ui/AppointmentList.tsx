import { Appointment } from "@/modules/appointment/model/Appointment";
import AppointmentComponent from "@/modules/dashboard/ui/components/AppointmentComponent";
import { FC } from "react";
import { LoadingState } from "../enums/LoadingState";
import Loader from "../generics/loader/Loader";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  appointments: Appointment[];
  loading: LoadingState;
}

const AppointmentList: FC<Props> = ({ appointments, loading }) => {
  switch (loading) {
    case LoadingState.pending:
      return (
        <>
          <div className="mx-auto">
            <Loader />
          </div>
          {appointments?.map((appointment) => (
            <AppointmentComponent
              appointment={appointment}
              key={appointment.id}
            />
          ))}
        </>
      );
    case LoadingState.failed:
      return (
        <div>
          <p className="text-4xl mx-auto text-center mt-5">
            failed to load data
          </p>
        </div>
      );

    case LoadingState.success:
      return (
        <AnimatePresence>
          {appointments?.length === 0 ? (
            <p className="mx-auto text-3xl">No appointment registered.</p>
          ) : (
            appointments?.map((appointment) => (
              <motion.div layout key={appointment.id}>
                <AppointmentComponent appointment={appointment} />
              </motion.div>
            ))
          )}
          ;
        </AnimatePresence>
      );

    default:
      return appointments?.map((appointment) => (
        <AppointmentComponent appointment={appointment} key={appointment.id} />
      ));
  }
};

export default AppointmentList;

import React from "react";
import AppointmentItem from "./AppointmentItem";
import Loader from "../loader/Loader";
import { IAppointment } from "@/types";

interface AppointmentListProps {
  appointments: IAppointment[];
  loading: boolean;
  onSelect: (appointment: IAppointment) => void;
  className?: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  loading,
  onSelect,
  className = "",
  ...props
}) => {
  if (loading) {
    return (
      <div className={`flex justify-center items-center h-32 ${className}`} {...props}>
        <Loader />
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`} {...props}>
        No appointments found
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          onClick={() => onSelect(appointment)}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
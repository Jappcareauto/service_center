import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import WeeklyStatsChart from "@/shared/generics/chart/WeeklyStatsChart";
import CalendarIcon from "@/shared/generics/menu/icons/CalendarIcon";
import StatisticComponent from "@/shared/generics/statistics/StatisticComponent";
import AppointmentDetailsView from "../details/AppointmentDetailsView";
import { useAppointement } from "./useAppointment";
import AppointmentList from "@/shared/ui/AppointmentList";
import { appointmentFilter } from "@/shared/slice/filterSlice";
import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";

const AppointmentsView = () => {
  const {
    action,
    state: { appointments, loading, ActiveAppointment, activeFilter: filter },
  } = useAppointement();

  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <StatisticComponent
            title="Appointments"
            value="02"
            badgeTitle="This Week"
            icon={<CalendarIcon className="text-primary" />}
            second
          />
          <WeeklyStatsChart />
        </div>
        <div className="mt-6 h-[calc(100vh_-_300px)] overflow-y-auto">
          <div className="flex items-center gap-x-2 mt-6">
            <CalendarIcon />
            <h2 className="font-medium">Appointments</h2>
          </div>
          <div className="mt-5 mb-4">
            <FilterBar
              labels={appointmentFilter}
              onFilter={(filter) =>
                action.onFilter(filter as AppointmentFilter)
              }
              activeFilter={filter}
            />
          </div>
          <div className="flex flex-col  gap-y-4">
            <AppointmentList loading={loading} appointments={appointments} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6"></div>
      {ActiveAppointment && (
        <AppointmentDetailsView
          appointment={ActiveAppointment}
          loading={loading}
        />
      )}{" "}
    </div>
  );
};

export default AppointmentsView;

import IMAGES from "@/assets/images";
import AppointmentDetailsView from "@/modules/appointment/ui/details/AppointmentDetailsView";
import WeeklyStatsChart from "@/shared/generics/chart/WeeklyStatsChart";
import CalendarIcon from "@/shared/generics/menu/icons/CalendarIcon";
import StatisticIcon from "@/shared/generics/menu/icons/StatisticIcon";
import StatisticComponent from "@/shared/generics/statistics/StatisticComponent";
// import DisclosiorAlertComponent from "./components/DisclosiorAlertComponent";
import FilterBar from "./components/FilterBar";
import AppointmentList from "@/shared/ui/AppointmentList";
import { useDashboardView } from "./useDashboardView";
import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";
import { appointmentFilter } from "@/shared/slice/filterSlice";
import useAppointmentStats from "@/shared/hooks/appointmentStatsHook";
import { ModalEvents } from "@/shared/helpers/hooks/useModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";

const DashboardView = () => {
  const {
    state: { appointments, loading, activeAppointment, filter },
    action, weeksRevenue
  } = useDashboardView();
  const { appointmentWeeklyStats } = useAppointmentStats();

  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <div
          onClick={() => ModalEvents.open(ModalEventKey.OPEN_CALENDAR)}
          >
            <StatisticComponent
              title="Appointments"
              value={appointments.length.toString()}
              badgeTitle={filter.replace(/_/g, ' ')}
              icon={<CalendarIcon className="text-white" />}
            />
          </div>
          <StatisticComponent
            title="Revenue"
            value={weeksRevenue}
            badgeTitle="This Week"
            icon={<StatisticIcon className="text-primary" />}
            second
          />
        </div>
        <div className="mt-6 h-[calc(100vh_-_300px)] overflow-y-auto">
          {/* <DisclosiorAlertComponent /> */}
          <div className="flex items-center gap-x-2 mt-6">
            <CalendarIcon />
            <h2 className="font-medium">Recent Appointments</h2>
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
          <div className="flex flex-col gap-y-4">
           
              <AppointmentList loading={loading} appointments={appointments} />
       
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <WeeklyStatsChart title="Appointments" data={appointmentWeeklyStats} />
        <div>
          <h2 className="font-medium text-base mb-4">Service</h2>
          <div className="bg-purple rounded-3xl w-full relative flex items-center h-[120px] px-4">
            <p className="text-2xl font-light">
              Vehicle
              <br />
              Reports
            </p>
            <img
              src={IMAGES.bgService}
              alt=""
              className="absolute bottom-0 right-2"
            />
          </div>
        </div>
      </div>
      {activeAppointment && (
        <AppointmentDetailsView
          appointment={activeAppointment}
          loading={loading}
        />
      )}
    </div>
  );
};

export default DashboardView;

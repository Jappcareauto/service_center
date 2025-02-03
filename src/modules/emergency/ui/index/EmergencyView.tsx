// import AppointmentDetailsView from '@/modules/appointment/ui/details/AppointmentDetailsView'
import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import WeeklyStatsChart from "@/shared/generics/chart/WeeklyStatsChart";
import CalendarIcon from "@/shared/generics/menu/icons/CalendarIcon";
import StatisticComponent from "@/shared/generics/statistics/StatisticComponent";
import EmergencyComponent from "../components/EmergencyComponent";
import { useFindAllEmergency } from "../../useCase/findAll/useFindALlEmergency";
import Loader from "@/shared/generics/loader/Loader";
import { LoadingState } from "@/shared/enums/LoadingState";
import { EmmergencyFilter } from "@/shared/slice/filterSlice";

const EmergencyView = () => {
  const { state: findAllState } = useFindAllEmergency();
  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <StatisticComponent
            title="Emergency"
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
            <h2 className="font-medium">Emergency Assistance Requests</h2>
          </div>
          <div className="mt-5 mb-4">
            <FilterBar
              onFilter={() => {}}
              disableDisposition
              labels={EmmergencyFilter}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            {findAllState.loading === LoadingState.pending && (
              <div className="loader w-full flex justify-center my-4">
                <Loader />
              </div>
            )}
            {/* <EmergencyComponent type="request" />
            <EmergencyComponent type="inProgress" /> */}
            {findAllState.emergency.map((emergency) => (
              <EmergencyComponent  emergency={emergency} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6"></div>
      {/* <AppointmentDetailsView  /> */}
    </div>
  );
};

export default EmergencyView;

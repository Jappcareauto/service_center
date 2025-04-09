import React, { useState } from 'react';
import { useAppDispatch } from "@/hooks/hooks";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { setErrorMessage } from "@/redux/messagesSlice";
import IMAGES from "@/assets/images";
import WeeklyStatsChart from "@/components/charts/WeeklyStatsChart";
import CalendarIcon from "@/components/menu/icons/CalendarIcon";
import StatisticIcon from "@/components/menu/icons/StatisticIcon";
import StatisticComponent from "@/components/statistics/StatisticComponent";
import { ModalEvents } from '@/hooks/useModal';
import { ModalEventKey } from '@/hooks/ModalEventKey';
import FilterBar from "@/components/FilterBar";
import httpClient from "@/services/api-client";
import AppointmentList from '@/components/appointments/AppointmentList';
import { IAppointment } from '@/types';
import { AppointmentStatus } from '@/enums/AppoointmentStatus';
import { calculateRange } from '@/utils/calculStatsRange';
import { StatsRange } from '@/enums/StatsRange';

interface IweeklyStatsData {
  name: string;  
  value: number; 
}

// interface IweeklyChartsData {
//   title: string,
//   data: IweeklyStatsData[]
// }

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus>(AppointmentStatus.NOTSTARTED);
  const [currentFilterLabel, setCurrentFilterLabel] = useState<string>("Not Started");
  const [activeAppointment, setActiveAppointment] = useState<IAppointment | null>(null);

  // React Query for appointments
  const { data: appointments, isLoading, error: appointmentsError } = useQuery({
    queryKey: ['appointments', activeStatus],
    queryFn: async () => {
      try{
        const response = await httpClient.post("/appointment/list", {
          status: activeStatus,
        });
        let data = response.data.data as IAppointment[];
        return data;
      } catch (error) {
        dispatch(setErrorMessage("Error fetching appointments"));
        return [];
      }
    },
  });
  

  const {data: appointmentWeeklyStats, isLoading: loadingWeeklyStats, error: weeklyStatsError} = useQuery({
    queryKey: ['appointmentWeeklyStats'],
    queryFn: async () => {
      const dataRange = calculateRange(StatsRange.MONTH);
      console.log(dataRange)
      const response = await httpClient.post("/appointment/stats", dataRange);
      if (weeklyStatsError) {
        dispatch(setErrorMessage("Error fetching weekly stats"));
        return;
      }
      const transformedData = Object.entries(response.data.data.currentStats).map(
        ([name, value]) => ({
          name,
          value: Number(value)
        })
      )
      return transformedData as IweeklyStatsData[];
    },
  });

  const weeklyStats = {
    title: "Appointments",
    data: appointmentWeeklyStats || [],
  };

  const handleSectActiveAppointment = (appointment: IAppointment) => {
    setActiveAppointment(appointment);
  };

  const filterLabels = ["Not Started", "In Progress", "Completed"];
  const handleFilterChange = (label: string) => {
    setCurrentFilterLabel(label);

    // Convert the label to enum value
    let status: AppointmentStatus;
    switch (label) {
      case "Not Started":
        status = AppointmentStatus.NOTSTARTED;
        break;
      case "In Progress":
        status = AppointmentStatus.INPROGRESS;
        break;
      case "Completed":
        status = AppointmentStatus.COMPLETED;
        break;
      default:
        status = AppointmentStatus.NOTSTARTED;
    }
    setActiveStatus(status);
  };

  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <div onClick={() => ModalEvents.open(ModalEventKey.OPEN_CALENDAR)}>
            <StatisticComponent
              title="Appointments"
              value={appointments?.length ?? 0}
              badgeTitle="Week"
              icon={<CalendarIcon className="text-white" />}
            />
          </div>
          <StatisticComponent
            title="Revenue"
            value="28,000"
            badgeTitle="This Week"
            icon={<StatisticIcon className="text-primary" />}
            second
          />
        </div>
        <div className="mt-6 h-[calc(100vh_-_300px)] overflow-y-auto">
          <div className="flex items-center gap-x-2 mt-6">
            <CalendarIcon />
            <h2 className="font-medium">Recent Appointments</h2>
          </div>
          <div className="mt-5 mb-4">
            <FilterBar
              labels={filterLabels}
              activeFilter={currentFilterLabel}
              onFilter={(filter) => {
                handleFilterChange(filter as string);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <AppointmentList
              appointments={appointments || []}
              loading={isLoading}
              onSelect={handleSectActiveAppointment}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <WeeklyStatsChart title="Appointments" data={weeklyStats.data} loading={loadingWeeklyStats}/>
        <div>
          <h2 className="font-medium text-base mb-4">Service</h2>
          <div className="bg-purple rounded-3xl w-full relative flex items-center h-[120px] px-4">
            <p className="text-2xl font-light">
              Vehicle
              <button onClick={() => ModalEvents.open(ModalEventKey.OPEN_CALENDAR)}>Click me</button>
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
    </div>
  );
};

export default Dashboard;
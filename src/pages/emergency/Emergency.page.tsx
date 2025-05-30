import CalendarIcon from '@/assets/icons/CalendarIcon';
import FilterBar from '@/components/filter-bar/FilterBar.component';
import StatisticsCard from '@/components/statistics-card/StatisticsCard.component';
import { emergencyStatuses } from '@/constants';
import { BarChart } from 'recharts';


const Emergency = () => {
  const data = [
    { name: 'Mon', value: 200 },
    { name: 'Tues', value: 100 },
    { name: 'Wed', value: 250 },
    { name: 'Thurs', value: 300 },
    { name: 'Fri', value: 150 },
    { name: 'Sat', value: 230 },
    { name: 'Sun', value: 270 },
  ];

  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <StatisticsCard
            title="Emergency"
            value="02"
            badgeTitle="This Week"
            icon={<CalendarIcon className="text-primary" />}
            second
          />
          <BarChart title="This Week" data={data}/>
        </div>
        <div className="mt-6 h-[calc(100vh_-_300px)] overflow-y-auto">
          <div className="flex items-center gap-x-2 mt-6">
            <CalendarIcon />
            <h2 className="font-medium">Emergency Assistance Requests</h2>
          </div>
          <div className="mt-5 mb-4">
            <FilterBar
              onFilter={() => {}}
              filters={emergencyStatuses}
            />
          </div>
          {/* <div className="flex flex-col gap-y-4">
            {findAllState.emergency.map((emergency) => (
              <EmergencyCard />
            ))}
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-y-6"></div>
      {/* <AppointmentDetailsView  /> */}
    </div>
  );
};

export default Emergency;

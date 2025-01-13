import Avatar from '@/shared/generics/Avatar'
import PrimaryButton from '@/shared/generics/buttons/PrimaryButton'
import CalendarIcon from '@/shared/generics/menu/icons/CalendarIcon'
import LocationIcon from '@/shared/generics/menu/icons/LocationIcon'
import StarIcon from '@/shared/generics/menu/icons/StarIcon'
import StatisticIcon from '@/shared/generics/menu/icons/StatisticIcon'
import StatisticComponent from '@/shared/generics/statistics/StatisticComponent'
import { ModalEventKey } from '@/shared/helpers/hooks/ModalEventKey'
import { ModalEvents } from '@/shared/helpers/hooks/useModal'
import LineChartComponent2 from '../components/LineChartComponent2'
import StatisticsProfileView from '../profile/StatisticsProfileView'
// import useStatisticsView from './useStatisticsView'

const StatisticsView = () => {

  // const a = useStatisticsView()
  return (
    <div>
      <Avatar name="" className='w-16 h-16' />
      <div className="flex items-end justify-between mt-4">
        <div>
          <h2 className='text-[22px]'>Sample Autoshop</h2>
          <div className="flex items-center gap-x-4 text-primary mb-4">
            <div className="flex items-center gap-x-2">
              <LocationIcon />
              <span>Deido, Douala</span>
            </div>
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="flex items-center gap-x-2">
              <StarIcon />
              <span>4.75</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <PrimaryButton
            onClick={() => ModalEvents.open(ModalEventKey.STATISTICS_PROFILE)}
            className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
          >
            View Profile
          </PrimaryButton>
        </div>
      </div>
      <div className='flex justify-between items-center my-6'>
        <h2 className='font=-medium'>Overview</h2>
        <PrimaryButton className='rounded-full h-10 text-sm'>
          Download Reports
        </PrimaryButton>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <StatisticComponent
          title="Appointments"
          value="02"
          badgeTitle="In Progress"
          icon={<CalendarIcon className="text-primary" />}
          second
          titleClassName='text-primary'
        />
        <StatisticComponent
          title="Revenue"
          value="28,000 Frs"
          badgeTitle="This Week"
          icon={<StatisticIcon className="text-primary" />}
          second
          titleClassName='text-primary'
        />
        <StatisticComponent
          title="VIN Request Made"
          value="182"
          badgeTitle="This Week"
          icon={<StatisticIcon className="text-primary" />}
          second
          titleClassName='text-primary'
        />
        <StatisticComponent
          title="Emergency Request"
          value="26"
          badgeTitle="This Week"
          icon={<StatisticIcon className="text-primary" />}
          second
          titleClassName='text-primary'
        />
      </div>
      <LineChartComponent2 />
      <div>
        <div className='flex items-center gap-x-2 mb-6'>
          <StatisticIcon className='text-grey' />
          <h2 className='font-medium'>Stats Breakdown by Category</h2>
        </div>
        <div className='flex justify-between w-full mb-4'>
          <h2 className='font-medium'>Appointment Stats</h2>
          <div className="text-sm rounded-2xl px-3 py-2 bg-grey3">
            This Week
          </div>
        </div>
        <div className='grid grid-cols-4 gap-6'>
          <StatComponent
            title='Total Revenue'
            value='65,000 Frs'
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title='Total Appointments'
            value='128'
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title='Completed Appointments'
            value='123'
            icon={<CalendarIcon className="text-primary" />}
          />
          <StatComponent
            title='Canceled Appointments'
            value='05'
            icon={<CalendarIcon className="text-primary" />}
          />
        </div>
      </div>
      <div className='my-10'>
        <div className='flex justify-between w-full mb-4'>
          <h2 className='font-medium'>Emergency Stats</h2>
          <div className="text-sm rounded-2xl px-3 py-2 bg-grey3">
            This Week
          </div>
        </div>
        <div className='grid grid-cols-4 gap-6'>
          <StatComponent
            title='Total Revenue'
            value='265,000 Frs'
            icon={<StatisticIcon className="text-primary" />}
          />
          <StatComponent
            title='Emergency Requests'
            value='28'
            icon={<StatisticIcon className="text-primary" />}
          />
          <StatComponent
            title='Accepted request'
            value='26'
            icon={<StatisticIcon className="text-primary" />}
          />
          <StatComponent
            title='Rejected requests'
            value='05'
            icon={<StatisticIcon className="text-primary" />}
          />
        </div>
      </div>
      <StatisticsProfileView />
    </div>
  )
}

export default StatisticsView

const StatComponent: React.FC<{ title: string, value: string, icon: React.ReactElement }> = ({
  icon, value,
  title,
}) => {
  return (
    <div className={'h-[130px] rounded-[20px] w-full flex flex-col justify-between p-4 border border-borderColor'}>
      <div className="flex items-center justify-between">
        {icon}
      </div>
      <div className=''>
        <h1 className="font-bold text-3xl">{value}</h1>
        <p className="text-grey4">{title}</p>
      </div>
    </div>
  )
}

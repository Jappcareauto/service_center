import Avatar from '@/shared/generics/Avatar';
import LocationIcon from '@/shared/generics/menu/icons/LocationIcon';
import StarIcon from '@/shared/generics/menu/icons/StarIcon';
import { RightModal } from '@/shared/generics/modals/RightModal';
import Switch from '@/shared/generics/switch/Switch';
import { ModalEventKey } from '@/shared/helpers/hooks/ModalEventKey';
import { useModal } from '@/shared/helpers/hooks/useModal';
import DateRangeComponent from '../components/DateRangeComponent';

const StatisticsProfileView = () => {
  const modal = useModal({
    eventName: ModalEventKey.STATISTICS_PROFILE
  });
  return (
    <RightModal
      isOpen={modal.isOpen}
      close={modal.close}
      className='pt-[72px] px-6'
    >
      <h2 className='font-medium mb-6'>Export Data</h2>
      <Avatar name="" />
      <div className='flex flex-col gap-y-6'>
        <div>
          <h2 className='text-[22px] font-bold'>Service Provider</h2>
          <div className="flex items-center gap-x-4 text-primary mt-4">
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
          <p className="mt-6 max-w-[340px]">
            Experience top-notch service at Japtech Auto shop, where we offer a wide range of basic car services to keep your vehicle running smoothly.
          </p>
        </div>
        <div>
          <h2 className='font-[600]'>Select Data to Export</h2>
          <div className='flex flex-col gap-y-3 mt-4'>
            <div className='flex items-center justify-between'>
              <p>Revenue</p>
              <Switch />
            </div>
            <div className='flex items-center justify-between'>
              <p>Emergency Requests</p>
              <Switch />
            </div>
            <div className='flex items-center justify-between'>
              <p>Vin Reports</p>
              <Switch />
            </div>
            <div className='flex items-center justify-between'>
              <p>Appointments</p>
              <Switch />
            </div>
          </div>
        </div>
        <DateRangeComponent />
      </div>
    </RightModal>
  )
}

export default StatisticsProfileView

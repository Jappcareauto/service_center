import { BellIcon } from '@heroicons/react/24/solid';
import { NotificaitonItemProps } from "./types";

const NotificationItem = ({ title, description }: NotificaitonItemProps) => {
  return (
    <div className="p-4 rounded-xl border border-borderColor">
      <div className="flex flex-row items-center gap-x-2">
        <BellIcon className='w-5 h-5 text-primary' />
        <p className='text-primary font-semibold'>{title}</p>
      </div>
      <p className="text-grey4 mt-2">{description}</p>
    </div>
  );
};

export default NotificationItem;

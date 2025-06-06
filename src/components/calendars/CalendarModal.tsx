import { useState } from 'react';
import Button from '../button/Button.component';
import SchedulerCard from '../scheduler-card/SchedulerCard.component';
import DatePicker from './DatePicker';
import Drawer from '../drawer/Drawer.component';


export const CalendarModal = () => {
 const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div className="px-4 space-y-4 py-8">
        <div className="flex justify-between">
          <div>Calendar</div>
          <div
            className=""
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.748 3.00098L20.3018 3.00149L20.402 3.01541L20.5009 3.043L20.562 3.06894C20.641 3.10383 20.7149 3.15436 20.7798 3.21929L20.8206 3.26333L20.8811 3.34481L20.9183 3.40983L20.957 3.50015L20.9761 3.56427L20.9897 3.62822L20.999 3.72141L20.9996 11.2549C20.9996 11.6691 20.6638 12.0049 20.2496 12.0049C19.8699 12.0049 19.5561 11.7227 19.5064 11.3566L19.4996 11.2549L19.499 5.55898L5.55905 19.504L11.2496 19.5049C11.6293 19.5049 11.9431 19.787 11.9927 20.1531L11.9996 20.2549C11.9996 20.6346 11.7174 20.9484 11.3513 20.998L11.2496 21.0049L3.71372 21.0041L3.68473 21.0012C3.61867 20.9966 3.55596 20.9828 3.49668 20.9617L3.40655 20.9228L3.38936 20.9123C3.18516 20.8019 3.03871 20.5988 3.00529 20.3595L2.99805 20.2549V12.751C2.99805 12.3368 3.33383 12.001 3.74805 12.001C4.12774 12.001 4.44154 12.2831 4.4912 12.6492L4.49805 12.751V18.443L18.438 4.49998L12.748 4.50098C12.3684 4.50098 12.0546 4.21882 12.0049 3.85275L11.998 3.75098C11.998 3.37128 12.2802 3.05749 12.6463 3.00782L12.748 3.00098Z"
                fill="#242424"
              />
            </svg>
          </div>
        </div>
        <DatePicker className="w-full" />
        <Button className="my-3 rounded-full border  border-black bg-inherit text-black scale-90">
          Show Scheldule
        </Button>
        <div className="h-full space-y-2 ">
          <SchedulerCard twBorderColor="" />
          <SchedulerCard
            twBorderColor="bg-[#F4EEFF] "
            twBgcolor=" border-[#744AFF] "
          />
          <SchedulerCard twBorderColor="" />
          <SchedulerCard
            twBorderColor="bg-[#EAFFE9] "
            twBgcolor=" border-[#18B760] "
          />
        </div>
      </div>
    </Drawer>
  );
};

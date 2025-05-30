import { twMerge } from 'tailwind-merge';
import { EmergencyCardProps } from './types';
import { EmergencyStatus } from '@/enums';
import { formatStatusText } from '@/utils/formatStatusText';
import Button from '../button/Button.component';

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  image,
  status,
  title,
  name,
}) => {
  return (
    <div className="border border-borderColor rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-x-4 font-normal">
          <div className="rounded-full border-[2px] border-primary p-[1.5px]">
            <img src={image} alt="" className="w-8 h-8" />
          </div>
          <p> {title} </p>
        </div>
        <div
          className={twMerge(
            "text-sm rounded-2xl px-3 lowercase first-letter:uppercase py-2 bg-grey3 whitespace-nowrap font-medium",
            status === EmergencyStatus.IN_PROGRESS
              ? "text-primary bg-primaryAccent"
              : "",
            status === EmergencyStatus.ACCEPTED
              ? "text-green bg-greenAccent"
              : ""
          )}
        >
          {status && formatStatusText(status)}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-x-4">
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            {name}
          </h2>
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            Break Failure
          </h2>
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            7000 Frs
          </h2>
          <h2 className="font-medium">12km Away</h2>
        </div>
        {status === EmergencyStatus.REQUESTED && (
          <div className="flex items-center gap-x-3">
            <Button variant='tertiary'>
              Decline
            </Button>
            <Button>
              Accept
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyCard;

import IMAGES from "@/assets/images";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import { twMerge } from "tailwind-merge";
import { EmergencyWithAllModel } from "../../slices/selector";
import { EmergencyStatus } from "../models/EmergencyStatus";
import { formatStatusText } from "@/shared/utils/formatText";

interface OwnProps {
  emergency: EmergencyWithAllModel;
}

const EmergencyComponent: React.FC<OwnProps> = ({ emergency }) => {
  console.log("emergency", emergency);
  return (
    <div className="border border-borderColor rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-x-4 font-normal">
          <div className="rounded-full border-[2px] border-primary p-[1.5px]">
            <img src={IMAGES.avatar} alt="" className="w-8 h-8" />
          </div>
          <p> {emergency.title} </p>
        </div>
        <div
          className={twMerge(
            "text-sm rounded-2xl px-3 lowercase first-letter:uppercase py-2 bg-grey3 whitespace-nowrap font-medium",
            emergency.status === EmergencyStatus.IN_PROGRESS
              ? "text-primary bg-primaryAccent"
              : "",
            emergency.status === EmergencyStatus.ACCEPTED
              ? "text-green bg-greenAccent"
              : ""
          )}
        >
          {formatStatusText(emergency.status)}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-x-4">
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            {emergency.vehicle?.name}
          </h2>
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            Break Failure
          </h2>
          <h2 className="font-medium border-r border-r-borderColor pr-4">
            7000 Frs
          </h2>
          <h2 className="font-medium">12km Away</h2>
        </div>
        {emergency.status === EmergencyStatus.REQUESTED && (
          <div className="flex items-center gap-x-3">
            <PrimaryButton className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm">
              Decline
            </PrimaryButton>
            <PrimaryButton className="border border-black h-10 rounded-full font-normal text-sm">
              Accept
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyComponent;

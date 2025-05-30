import { EmergencyCardProps } from "./types";

const EmergencyCardBottom = ({ data: { note } }: EmergencyCardProps) => {
  return (
    <div
      id="bottom"
      className="flex justify-between bg-primaryAccent w-full gap-x-2"
    >
      <div className="w-[50%]">
        <p className="text-gray-400 font-light text-sm mb-2">Added Note</p>
        <p>{note}</p>
      </div>
      <div className="border border-borderColor h-44 bg-gray-100 rounded-xl w-[60%]">
        Map
      </div>
    </div>
  );
};

export default EmergencyCardBottom;

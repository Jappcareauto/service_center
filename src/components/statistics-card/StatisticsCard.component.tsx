import { twMerge } from "tailwind-merge";
import { StatisticsCardProps } from "./types";
import Skeleton from "../skeletons/Skeleton.component";

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  value,
  title,
  badgeTitle,
  second,
  titleClassName,
  isLoading,
  isSmall,
}) => {
  return (
    <div
      className={twMerge(
        "h-[200px] rounded-[20px] w-full flex flex-col justify-between px-6 py-4",
        second ? "border border-borderColor" : "bg-primary",
        isSmall && "h-auto"
      )}
    >
      <div className="flex items-center justify-between">
        {icon}
        <div
          className={twMerge(
            "text-sm rounded-2xl px-3 py-2",
            second ? "bg-grey3 text-grey4" : "bg-primaryAccent2 text-white"
          )}
        >
          {badgeTitle}
        </div>
      </div>
      {isLoading ? (
        <Skeleton paragraph={{ rows: 3 }} />
      ) : (
        <div className={twMerge(second ? "" : "text-white")}>
          <h1 className={twMerge("font-bold text-3xl", isSmall && "my-3")}>
            {value}
          </h1>
          <p className={twMerge(second ? "text-grey4" : "", titleClassName)}>
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;

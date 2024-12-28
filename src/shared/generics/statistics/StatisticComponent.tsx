import { twMerge } from "tailwind-merge";

interface OwnProps {
  icon: React.ReactElement,
  value: string;
  title: string;
  titleClassName?: string;
  badgeTitle: string;
  second?: boolean;
}

const StatisticComponent: React.FC<OwnProps> = ({
  icon, value,
  title, badgeTitle,
  second, titleClassName,
}) => {
  return (
    <div className={
      twMerge(
        'h-[200px] rounded-[20px] w-full flex flex-col justify-between px-6 py-4',
        second ? "border border-borderColor" : "bg-primary"
      )
    }>
      <div className="flex items-center justify-between">
        {icon}
        <div className={
          twMerge(
            "text-sm rounded-2xl px-3 py-2",
            second ? "bg-grey3 text-grey4" : "bg-primaryAccent2 text-white"
          )
        }>
          {badgeTitle}
        </div>
      </div>
      <div className={twMerge(
        second ? "" : "text-white"
      )}>
        <h1 className="font-bold text-3xl">{value}</h1>
        <p className={twMerge(
          second ? "text-grey4" : "",
          titleClassName,
        )}>{title}</p>
      </div>
    </div>
  )
}

export default StatisticComponent

import { twMerge } from "tailwind-merge";

interface OwnProps {
  title: string;
  image: string;
  className?: string;
}

const SpecializedServicesComponent: React.FC<OwnProps> = ({ image, title, className }) => {
  return (
    <div className="w-[122px] h-[140px] rounded-2xl bg-primaryAccent mr-2 relative p-4 overflow-hidden">
      <h2 className="font-normal">{title}</h2>
      <img
        src={image} alt="" className={twMerge(
        "absolute -bottom-2 -right-0 object-contain",
        className,
      )} />
    </div>
  )
}

export default SpecializedServicesComponent

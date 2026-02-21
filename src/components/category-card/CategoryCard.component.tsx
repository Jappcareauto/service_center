import { ServiceCenterCategory } from "@/types";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { getServiceIcon } from "./types";

const CategoryCard: FC<ServiceCenterCategory> = ({
  code,
  displayName,
  description,
}) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        {/* Icon Container */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
          {getServiceIcon?.(code)}
        </div>

        {/* Decorative Code Badge */}
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          {code.replace("_", " ")}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
          {displayName}
        </h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center text-sm font-semibold text-primaryAccent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        View details
        <ChevronRightIcon className="ml-1 w-4 h-4" />
      </div>
    </div>
  );
};

export default CategoryCard;

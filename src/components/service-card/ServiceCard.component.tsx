import { ServiceCenterService } from "@/types";
import {
  CalendarIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import React from "react";

// Mapping your provided colors to a style object for easy reference
const brand = {
  primary: "#FB7C37",
  primaryAccent: "#FFEDE6",
  grey: "#797676",
  grey2: "#242424",
  background: "#FFF8F6",
  borderColor: "#E5E2E1",
  textColor: "#111111",
};

const ServiceCard: React.FC<ServiceCenterService> = ({
  id,
  title,
  description,
  createdAt,
  createdBy,
}) => {
  return (
    <div
      className="max-w-sm rounded-2xl border transition-all duration-300 hover:shadow-md"
      style={{ backgroundColor: "white", borderColor: brand.borderColor }}
    >
      {/* Header: Smaller height, using brand colors */}
      <div
        className="p-4 flex items-center gap-3 rounded-t-2xl"
        style={{ backgroundColor: brand.primaryAccent }}
      >
        <div className="p-2 rounded-lg" style={{ backgroundColor: "white" }}>
          <SparklesIcon className="w-5 h-5" style={{ color: brand.primary }} />
        </div>
        <div>
          <h3
            className="text-sm font-bold uppercase tracking-tight"
            style={{ color: brand.textColor }}
          >
            {title.replace("_", " ")}
          </h3>
          <p className="text-[10px] font-medium" style={{ color: brand.grey }}>
            Service ID: {id.split("-").pop()}
          </p>
        </div>
      </div>

      {/* Body: Focused on the description */}
      <div className="p-4">
        <p className="text-sm font-medium mb-4" style={{ color: brand.grey2 }}>
          {description}
        </p>

        {/* Footer info: Compact horizontal layout */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: brand.borderColor }}
        >
          <div className="flex items-center gap-1.5">
            <CalendarIcon
              className="w-3.5 h-3.5"
              style={{ color: brand.grey }}
            />
            <span
              className="text-[10px] font-semibold"
              style={{ color: brand.grey }}
            >
              {dayjs(createdAt).format("MMM D, YYYY")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5" style={{ color: brand.grey }} />
            <span
              className="text-[10px] font-semibold truncate max-w-[80px]"
              style={{ color: brand.grey }}
            >
              {createdBy && createdBy?.split("-").pop()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

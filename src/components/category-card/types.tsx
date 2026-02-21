import {
    PaintBrushIcon,
    SparklesIcon,
    WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

export const getServiceIcon = (code: string) => {
  switch (code) {
    case "GENERAL_MAINTENANCE":
      return <WrenchScrewdriverIcon className="w-6 h-6 text-blue-600" />;
    case "BODY_SHOP":
      return <PaintBrushIcon className="w-6 h-6 text-purple-600" />;
    case "DEEP_CLEANING":
      return <SparklesIcon className="w-6 h-6 text-teal-600" />;
    default:
      return <WrenchScrewdriverIcon className="w-6 h-6 text-gray-600" />;
  }
};

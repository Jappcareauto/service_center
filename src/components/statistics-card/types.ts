export interface StatisticsCardProps {
    icon: React.ReactElement;
    value: string | number;
    title: string;
    titleClassName?: string;
    badgeTitle: string;
    second?: boolean;
    isLoading?: boolean;
    isSmall?: boolean;
  }
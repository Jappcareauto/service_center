export interface StatisticsCardProps {
    icon: React.ReactElement;
    value: string | number | undefined;
    title: string;
    titleClassName?: string;
    badgeTitle?: string;
    second?: boolean;
    isLoading?: boolean;
    isSmall?: boolean;
  }
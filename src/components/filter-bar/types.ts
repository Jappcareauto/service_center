import { DropdownType } from '@/constants';

export interface FilterBarProps {
  activeFilter?: string;
  onFilter: (filter: string) => void;
  filterClassName?: (isSelected: boolean) => string;
  filters: DropdownType[];
  onList?: () => void;
  onExpand?: () => void;
  onGrid?: () => void;
  hideLayoutButtons?: boolean;
  isList: boolean;
}
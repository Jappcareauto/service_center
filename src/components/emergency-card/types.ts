import { EmergencyStatus } from '@/enums';

export interface EmergencyCardProps {
  showBottom?: boolean;
  data?: {
    id: string;
    name: string;
    car: string;
    issue: string;
    cost: string;
    distance: string;
    note: string;
  };
  title?: string;
  image?: string
  status?: EmergencyStatus
  name?: string
}

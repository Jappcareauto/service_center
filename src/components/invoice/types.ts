import { InvoiceStatus } from '@/enums';
import { Money } from '@/types';

export interface InvoiceProps {
  name?: string
  email?: string
  invoiceNumber: string
  issueDate: string
  status: InvoiceStatus
  money?: Money
  service?: string
  onClick?: () => void
}

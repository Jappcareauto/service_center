import { Money } from '@/types';

export interface InvoiceProps {
  name?: string
  email?: string
  invoiceNumber: string
  issueDate: string
  money?: Money
  service?: string
  onClick?: () => void
}

export interface InvoiceTotalProps {
  tax?: string;
  total?: number;
  onTotal?: (value: number) => void
  onFee?: (value: number) => void
  disabled?: boolean
  isUpdating?: boolean
}

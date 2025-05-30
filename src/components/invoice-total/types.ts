export interface InvoiceTotalProps {
  tax?: string;
  total?: number;
  onTotal?: (value: number) => void
  disabled?: boolean
}

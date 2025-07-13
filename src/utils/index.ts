import { AppointmentStatus, InvoiceStatus, PaymentStatus } from "@/enums";
import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";

export const getButtonLabel = (status: AppointmentStatus) => {
  switch (status) {
    case "NOT_STARTED":
      return "Mark as in progress";
    case "IN_PROGRESS":
      return "Mark as completed";
    case "COMPLETED":
      return "Completed";
    default:
      return "Update Status";
  }
};

export const getStatusStyles = (
  status: AppointmentStatus | InvoiceStatus,
  isInvoice: boolean = false
) => {
  switch (status) {
    case isInvoice ? InvoiceStatus.DRAFT : AppointmentStatus.NOT_STARTED:
      return "bg-gray-100 text-gray-500 text-sm";
    case isInvoice ? InvoiceStatus.PENDING : AppointmentStatus.IN_PROGRESS:
      return `bg-primaryAccent text-primary px-3 text-sm ${
        isInvoice && "bg-redAccent bg-red-600"
      }`;
    case isInvoice ? InvoiceStatus.PAID : AppointmentStatus.COMPLETED:
      return `bg-green-100 text-green-700 text-sm ${
        isInvoice && " bg-green-100 text-green-700"
      }`;
    case InvoiceStatus.DECLINED:
      return `bg-red-500 text-white text-sm ${
        isInvoice && "bg-redAccent bg-red-600"
      }`;
    default:
      return "bg-gray-100 text-gray-500 text-sm";
  }
};

export const getPaymentStatusStyles = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.ALL:
      return "bg-gray-100 text-gray-500 text-xs";
    case PaymentStatus.EARNINGS:
      return `text-xs bg-green-200 text-green-800`;
    case PaymentStatus.WITHDRAWALS:
      return `bg-red-500 text-white text-xs bg-redAccent bg-red-600`;
    default:
      return "bg-gray-100 text-gray-500 text-xs";
  }
};

export const getDefaultWeekDates = () => {
  const today = new Date();

  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const formattedStart = format(weekStart, "yyyy-MM-dd");
  const formattedEnd = format(weekEnd, "yyyy-MM-dd");
  return {
    startDate: formattedStart,
    endDate: formattedEnd,
  };
};

export const getFormattedDate = (date: string) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "MMM dd, yyyy");
  return formattedDate;
};

export const getSubmitData = (status: AppointmentStatus, id: string) => {
  if (status === AppointmentStatus.NOT_STARTED || status === undefined) {
    return {
      id: id,
      status: AppointmentStatus.IN_PROGRESS,
    };
  } else if (status === AppointmentStatus.IN_PROGRESS) {
    return {
      id: id,
      status: AppointmentStatus.COMPLETED,
    };
  }
};

export const formatAmount = (text: string) => {
  const rawValue = text?.replace(/\D/g, "");
  const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
};

export const getBillingStatusStyles = (status: "Paid" | "Pending") => {
  switch (status) {
    case "Paid":
      return `text-xs bg-green-200 text-green-800`;
    case "Pending":
      return `bg-red-500 text-white text-xs bg-redAccent bg-red-600`;
    default:
      return "bg-gray-100 text-gray-500 text-xs";
  }
};

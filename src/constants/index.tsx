/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeIcon } from "@/assets/icons";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import ChatIcon from "@/assets/icons/ChatIcon";
import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import { PaymentIcon } from "@/assets/icons/PaymentIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import StatisticIcon from "@/assets/icons/StatisticIcon";
import images from "@/assets/images";
import Avatar from "@/components/avatar/Avatar.component";
import {
  AppointmentStatus,
  ChatStatus,
  InvoiceStatus,
  PaymentStatus,
} from "@/enums";
import { paths } from "@/routes/paths";
import {
  getBillingStatusStyles,
  getFormattedDate,
  getPaymentStatusStyles,
  getStatusStyles,
} from "@/utils";
import { formatStatusText } from "@/utils/formatStatusText";
import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  PencilIcon,
  TrashIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface MenuItem {
  title: string;
  icon: (active: boolean) => React.ReactElement;
  route: string;
}

export interface DropdownType {
  value: string;
  label: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: (active: boolean) => (
      <HomeIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.dashboard,
  },
  {
    title: "Appointments",
    icon: (active: boolean) => (
      <CalendarIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.appointments,
  },
  // {
  //   title: "Emergency Assistance",
  //   icon: <CalendarIcon />,
  //   route: paths.emergency,
  // },
  {
    title: "Chats",
    icon: (active: boolean) => (
      <ChatIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.chat,
  },
  {
    title: "Statistics",
    icon: (active: boolean) => (
      <StatisticIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.statistics,
  },
  {
    title: "Invoices",
    icon: (active: boolean) => (
      <InvoiceIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.invoices,
  },
  {
    title: "Payments",
    icon: (active: boolean) => (
      <PaymentIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.payments,
  },
  {
    title: "Profile",
    icon: (active: boolean) => (
      <ProfileIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.profile,
  },
  {
    title: "Plan and Billing",
    icon: (active: boolean) => (
      <InvoiceIcon color={active ? "#FB7C37" : "#111111"} />
    ),
    route: paths.billing,
  },
];

export const appointmentStatuses: DropdownType[] = [
  {
    label: "All",
    value: AppointmentStatus.ALL,
  },
  {
    label: "Not Started",
    value: AppointmentStatus.NOT_STARTED,
  },
  {
    label: "In Progress",
    value: AppointmentStatus.IN_PROGRESS,
  },
  {
    label: "Completed",
    value: AppointmentStatus.COMPLETED,
  },
  {
    label: "Canceled",
    value: AppointmentStatus.CANCELLED,
  },
];

export const InvoiceStatuses: DropdownType[] = [
  {
    label: "All",
    value: InvoiceStatus.ALL,
  },
  {
    label: "Pending",
    value: InvoiceStatus.PENDING,
  },
  {
    label: "Paid",
    value: InvoiceStatus.PAID,
  },
  {
    label: "Declined",
    value: InvoiceStatus.DECLINED,
  },
  {
    label: "Draft",
    value: InvoiceStatus.DRAFT,
  },
];

export const emergencyStatuses: DropdownType[] = [
  {
    label: "Requested",
    value: "Accepted",
  },
  {
    label: "Accepted",
    value: "Accepted",
  },
  {
    label: "Declined",
    value: "Declined",
  },
];

export const getAppointmentColumns = (
  handleDelete: (id: string) => void,
  handleViewDetails: (id: string) => void
) => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 60,
    render: (url: string) => {
      return url ? (
        <img
          src={url}
          alt="Vehicle"
          className="w-7 h-7 object-contain border border-borderColor rounded-full p-1"
        />
      ) : (
        <TruckIcon className="w-7 h-7 rounded-full text-gray-500 border border-borderColor p-1" />
      );
    },
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
  },
  {
    title: "Vehicle",
    dataIndex: "vehicleName",
    key: "vehicleName",
    ellipsis: true,
  },
  {
    title: "Service",
    dataIndex: "serviceTitle",
    key: "serviceTitle",
    ellipsis: true,
  },
  {
    title: "Location Type",
    dataIndex: "locationType",
    key: "locationType",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: AppointmentStatus) => (
      <span
        className={twMerge(
          "rounded-full px-2 py-1 lowercase first-letter:uppercase",
          status
            ? getStatusStyles(status)
            : getStatusStyles(AppointmentStatus.NOT_STARTED)
        )}
      >
        {status
          ? formatStatusText(status)
          : formatStatusText(AppointmentStatus.NOT_STARTED)}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text: string) =>
      new Date(text).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    ellipsis: true,
  },
  {
    title: "",
    key: "actions",
    width: 80,
    render: (_: any, record: any) => (
      <div className="flex items-center gap-x-4">
        <TrashIcon
          className="bg-red-600-500 cursor-pointer hover:bg-red-600-700"
          onClick={() => handleDelete(record.id)}
        />
        <ArrowRightIcon
          className="text-gray-600 cursor-pointer hover:text-black"
          onClick={() => handleViewDetails(record.id)}
        />
      </div>
    ),
  },
];
export const getInvoicesColumns = (
  handleDelete: (id: string) => void,
  handleViewDetails: (id: string) => void,
  handleEdit: (id: string) => void,
  handleMore: (id: string) => void
) => {
  return [
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   width: 60,
    //   render: (url: string) => {
    //     return url ? (
    //       <img
    //         src={url}
    //         alt="Vehicle"
    //         className="w-7 h-7 object-contain border border-borderColor rounded-full p-1"
    //       />
    //     ) : (
    //       <TruckIcon className="w-7 h-7 rounded-full text-gray-500 border border-borderColor p-1" />
    //     );
    //   },
    // },
    {
      title: "Invoice No",
      dataIndex: "number",
      key: "number",
      ellipsis: true,
    },
    {
      title: "User",
      dataIndex: "number",
      key: "number",
      render: (url: string) => {
        return <Avatar name={url} className="w-6 h-6" />;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ellipsis: true,
      render: (text: string) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      ellipsis: true,
      render: (text: string) => (
        <div className="flex items-center gap-x-2">
          <div>
            <CalendarDaysIcon className="w-5 h-5 rounded-2xl" />
          </div>
          <p>{text && getFormattedDate(text)}</p>
        </div>
      ),
    },
    {
      title: "Due Date",
      key: "dueDate",
      dataIndex: "dueDate",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-x-2">
          {/* <CalendarDaysIcon className='w-10 h-10' /> */}
          <div>
            <CalendarDaysIcon className="w-5 h-5 rounded-2xl" />
          </div>
          <span>
            {record?.paidDate
              ? `Paid on ${
                  record?.paidDate && getFormattedDate(record?.paidDate)
                }`
              : `Due on ${
                  record?.dueDate && getFormattedDate(record?.dueDate)
                }`}
          </span>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: InvoiceStatus) => (
        <span
          className={twMerge(
            "rounded-full px-2 py-1 lowercase first-letter:uppercase",
            status
              ? getStatusStyles(status, true)
              : getStatusStyles(InvoiceStatus.DRAFT)
          )}
        >
          {status ? status : InvoiceStatus.DRAFT}
        </span>
      ),
      ellipsis: true,
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-x-5">
          <PencilIcon
            onClick={() => handleEdit(record.id)}
            className="cursor-pointer"
          />
          <ArrowDownIcon
            onClick={() => handleMore(record.id)}
            className="cursor-pointer"
          />
          <TrashIcon
            className="bg-red-600-500 hover:bg-red-600-700 cursor-pointer"
            onClick={() => handleDelete(record.id)}
          />
          <ArrowRightIcon
            className="text-primary hover:text-black cursor-pointer"
            onClick={() => handleViewDetails(record.id)}
          />
        </div>
      ),
    },
  ];
};

export const formattedStats = [
  { name: "Mon", value: 0 },
  { name: "Tues", value: 0 },
  { name: "Wed", value: 0 },
  { name: "Thurs", value: 0 },
  { name: "Fri", value: 0 },
  { name: "Sat", value: 0 },
  { name: "Sun", value: 0 },
];

export const dayMap = {
  MONDAY: "Mon",
  TUESDAY: "Tues",
  WEDNESDAY: "Wed",
  THURSDAY: "Thurs",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};
export const weekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const emergencyItems = [
  {
    id: "1",
    name: "Sarah Svega",
    car: "Porsche Taycan Turbo S",
    issue: "Brake Failure",
    cost: "7000 Frs",
    distance: "12km Away",
    note: "Hello, Please I have a brake failure, the pedal seems very loose.",
  },
  // {
  //   id: "2",
  //   name: "John Doe",
  //   car: "BMW i8",
  //   issue: "Engine Overheat",
  //   cost: "9000 Frs",
  //   distance: "5km Away",
  //   note: "My engine is overheating quickly. Need help.",
  // },
];

export const notificationItems = [
  {
    id: "1",
    title: "Appointment Reminder",
    description:
      "Your appointment is scheduled for tomorrow at 10:00 AM. Please be on time.",
    date: "2023-10-01T10:00:00Z",
  },
  {
    id: "2",
    title: "New Message",
    description: "You have a new message from your service provider.",
    date: "2023-10-02T12:00:00Z",
  },
];
export const ChatStatuses: DropdownType[] = [
  {
    label: "All",
    value: ChatStatus.ALL,
  },
  // {
  //   label: "Unread",
  //   value: ChatStatus.UNREAD,
  // },
];

export const PaymentsStatuses: DropdownType[] = [
  {
    label: "All",
    value: PaymentStatus.ALL,
  },
  {
    label: "Earnings",
    value: PaymentStatus.EARNINGS,
  },
  {
    label: "Withdrawals",
    value: PaymentStatus.WITHDRAWALS,
  },
];

export const paymentMethods = [
  {
    id: 0,
    title: "MTN Momo",
    date: "13 December 2024",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="4" fill="#FFCC00" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.5567 15.7822C30.5567 19.8041 24.0386 23.0657 16 23.0657C7.95637 23.0657 1.43823 19.8041 1.43823 15.7822C1.43823 11.7655 7.95637 8.50391 16 8.50391C24.0386 8.50391 30.5567 11.7655 30.5567 15.7822ZM29.4061 15.7822C29.4061 12.3973 23.4068 9.65447 16 9.65447C8.59329 9.65447 2.58879 12.3973 2.58879 15.7822C2.58879 19.1671 8.59329 21.9151 16 21.9151C23.4068 21.9151 29.4061 19.1671 29.4061 15.7822ZM14.1612 14.5084V13.3578H18.2703V14.5084H16.791V18.2118H15.6405V14.5084H14.1612ZM23.227 13.3578V18.2118H22.0764L19.991 15.3251V18.2118H18.8456V13.3578H19.991L22.0764 16.2445V13.3578H23.227ZM8.73711 18.2118V13.3578H9.88253L11.1615 15.32L12.4405 13.3578H13.5859V18.2118H12.4405V15.4638L11.5673 16.8044H10.7557L9.88253 15.4638V18.2118H8.73711Z"
          fill="#020001"
        />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Orange Money",
    date: "13 December 2024",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 0H0V32H32V0Z" fill="#FF7900" />
        <path
          d="M12.5517 28.8955C12.1002 29.189 11.6035 29.3358 11.0843 29.3358C10.249 29.3358 9.76367 28.7827 9.76367 28.0377C9.76367 27.0444 10.678 26.5139 12.563 26.2994V26.0511C12.563 25.7238 12.3146 25.5432 11.8631 25.5432C11.4116 25.5432 11.0392 25.7238 10.7795 26.0511L9.98942 25.5996C10.4071 25.0239 11.0392 24.7305 11.8857 24.7305C13.0483 24.7305 13.703 25.2384 13.703 26.0511C13.703 26.0511 13.703 29.268 13.703 29.2793H12.6646L12.5517 28.8955ZM10.9037 27.9587C10.9037 28.2522 11.0956 28.5343 11.4342 28.5343C11.8067 28.5343 12.1566 28.3763 12.5178 28.0603V27.0105C11.4229 27.1573 10.9037 27.4282 10.9037 27.9587Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Card",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.75 14.5C15.3358 14.5 15 14.8358 15 15.25C15 15.6642 15.3358 16 15.75 16H18.25C18.6642 16 19 15.6642 19 15.25C19 14.8358 18.6642 14.5 18.25 14.5H15.75ZM2 8.25C2 6.45507 3.45507 5 5.25 5H18.75C20.5449 5 22 6.45507 22 8.25V15.75C22 17.5449 20.5449 19 18.75 19H5.25C3.45507 19 2 17.5449 2 15.75V8.25ZM20.5 9.5V8.25C20.5 7.2835 19.7165 6.5 18.75 6.5H5.25C4.2835 6.5 3.5 7.2835 3.5 8.25V9.5H20.5ZM3.5 11V15.75C3.5 16.7165 4.2835 17.5 5.25 17.5H18.75C19.7165 17.5 20.5 16.7165 20.5 15.75V11H3.5Z"
          fill="#111111"
        />
      </svg>
    ),
  },
];

export const getPaymentsColumns = () => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: (text: string) => (
      <span className="lowercase first-letter:uppercase">
        {text && getFormattedDate(text)}
      </span>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethodName",
    key: "paymentMethodName",
  },
  {
    title: "From",
    dataIndex: "userFrom",
    key: "userFrom",
    render: (text: string) =>
      text && (
        <Avatar
          className="w-6 h-6"
          name={text}
          label="From"
          namesClassName="flex flex-col-reverse"
          labelClassName="text-xs"
        />
      ),
  },
  {
    title: "To",
    dataIndex: "userTo",
    key: "userTo",
    render: (text: string) =>
      text && (
        <Avatar
          className="w-6 h-6"
          name={text}
          label="To"
          namesClassName="flex flex-col-reverse"
          labelClassName="text-xs"
        />
      ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: PaymentStatus) => (
      <div className="flex items-center justify-center gap-x-3">
        <span
          className={twMerge(
            "rounded-full px-3 py-1 lowercase first-letter:uppercase",
            status && getPaymentStatusStyles(status)
          )}
        >
          {status && formatStatusText(status)}
        </span>
        {status === PaymentStatus.EARNINGS ? (
          <ArrowDownLeftIcon className="w-4 h-5 text-green-700" />
        ) : (
          <ArrowUpRightIcon className="bg-red-600" />
        )}
      </div>
    ),
  },
];

export const invoiceItemsColumns = [
  {
    title: "Item",
    dataIndex: "item",
    width: "40%",
    editable: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "15%",
    editable: true,
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    width: "15%",
    editable: true,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    width: "15%",
    editable: false,
  },
];

export const chatItems = [
  { name: "Mike", numberOfUnreadMessage: 12, time: "9:45 am" },
  { name: "Anna", numberOfUnreadMessage: 5, time: "1:30 pm" },
  { name: "Loius", numberOfUnreadMessage: 8, time: "3:15 pm" },
  { name: "Sara", numberOfUnreadMessage: 3, time: "10:50 am" },
  { name: "Tom", numberOfUnreadMessage: 14, time: "4:20 pm" },
  { name: "Chris", numberOfUnreadMessage: 6, time: "11:05 am" },
  { name: "Jane", numberOfUnreadMessage: 9, time: "2:00 pm" },
];

export const getBillingColumns = (handleViewDetails: (id: string) => void) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: string) => (
      <span className="lowercase first-letter:uppercase font-bold">
        #{text}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text: string) => (
      <span className="lowercase first-letter:uppercase">{text}</span>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: "Paid" | "Pending") => (
      <div className="flex items-center justify-center gap-x-3">
        <span
          className={twMerge(
            "rounded-full px-3 py-1 lowercase first-letter:uppercase",
            status && getBillingStatusStyles(status)
          )}
        >
          {status && formatStatusText(status)}
        </span>
      </div>
    ),
  },
  {
    title: "",
    key: "actions",
    render: (_: any, record: any) => (
      <button className="flex items-center gap-x-5">
        View Invoice
        <ArrowRightIcon
          className="hover:text-black cursor-pointer w-5 h-6"
          onClick={() => handleViewDetails(record.id)}
        />
      </button>
    ),
  },
];

export const billingItems = [
  {
    id: "01AH6817",
    amount: "30,000 XAF",
    status: "Paid",
    date: "1 December 2024",
    method: "MTN MOMO",
  },
  {
    id: "02BG7921",
    amount: "30,000 XAF",
    status: "Paid",
    date: "3 December 2024",
    method: "ORANGE MOMO",
  },
  {
    id: "03CD1045",
    amount: "30,000 XAF",
    status: "Paid",
    date: "5 December 2024",
    method: "MTN MOMO",
  },
  {
    id: "04DE2368",
    amount: "30,000 XAF",
    status: "Pending",
    date: "7 December 2024",
    method: "ORANGE MOMO",
  },
  {
    id: "05EF3490",
    amount: "230,000 XAF",
    status: "Paid",
    date: "9 December 2024",
    method: "ORANGE MOMO",
  },
  {
    id: "06FG4503",
    amount: "30,000 XAF",
    status: "Paid",
    date: "11 December 2024",
    method: "MTN MOMO",
  },
  {
    id: "07GH5619",
    amount: "30,000 XAF",
    status: "Paid",
    date: "13 December 2024",
    method: "ORANGE MOMO",
  },
];

export const serviceImage = {
  VIN_DETECTION: {
    image: images.s2,
  },
  GENERAL_MAINTAINANCE: {
    image: images.s1,
  },
};

export const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "5000 frs",
    features: [
      "Access to a comprehensive service center locator to find nearby facilities.",
      "Personalized vehicle consultations to help you make informed decisions.",
      "24/7 emergency services for peace of mind on the road.",
      "Regular maintenance reminders to keep your vehicle in top shape.",
      "Exclusive discounts on services and parts at partner locations.",
      "Real-time tracking of your vehicle's health and performance.",
      "User-friendly interface for easy navigation and management.",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "10000 frs",
    features: [
      "All Basic Plan features included.",
      "Priority support and faster emergency response.",
      "Advanced diagnostics and predictive maintenance alerts.",
      "Complimentary annual vehicle inspection.",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: "20000 frs",
    features: [
      "All Premium Plan features included.",
      "Fleet management dashboard and analytics.",
      "Custom integrations with third-party tools.",
      "Dedicated account manager and 24/7 enterprise support.",
    ],
  },
];

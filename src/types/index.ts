/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppointmentStatus, InvoiceStatus, MessageType } from "@/enums";

export interface GenericType {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}
export interface GenericResponse {
  meta?: {
    statusCode: number;
    statusDescription: "SUCCESS" | "FAILURE" | "ERROR";
    message: string;
  };
  errors?: string[] | null | string;
  pagination?: Pagination | null;
}

export interface Location extends GenericType {
  latitude: number;
  longitude: number;
  description: string;
  name: string;
}

export interface Phone {
  code: string;
  number: string;
  user: string;
}

export interface Role {
  definition: string;
  expired: string;
}

export interface UserRole {
  user: string;
  role: Role;
}
export interface UserPermission {
  user: string;
  permission: Role;
  itemId: string;
  itemType: string;
  expiration: string;
}

export interface LanguageType {
  code: string;
  name: string;
}

// export interface Location extends GenericType {
//   latitude: number;
//   longitude: number;
//   description: string;
//   name: string;
//   id?: string;
// }
export interface VehicleDetail {
  make: string;
  model: string;
  year: string;
  trim: string;
  transmission: string;
  driveTrain: string;
  power: string;
  bodyType: string;
  vehicleId: string;
}
export interface VehicleMediaItem {
  sourceUrl: string;
  capturedUrl: string;
  type: string;
  mediaId: string;
  fileId: string;
  fileUrl: string;
}
export interface VehicleMedia extends GenericType {
  type: string;
  source: string;
  mainItemUrl: string;
  items: VehicleMediaItem[];
}
export interface Vehicle {
  name: string;
  description: string;
  detail: VehicleDetail;
  garageId: string;
  imageUrl: string;
  media: VehicleMedia;
  registrationNumber: string;
  vin: string;
  id: string;
}
export interface Garage {
  name: string;
  location: Location;
  owner: string;
  vehicles: Vehicle[];
  image: File;
}

export interface PaymentOption {
  user: string;
  paymentMethod: string;
  approved: string;
  mobileMoney: {
    mobileWalletNumber: string;
  };
}
export interface User extends GenericResponse {
  name: string | undefined;
  email: string | undefined;
  password?: string;
  id?: string;
  verified?: string;
  passwordExpiry?: string;
  dateOfBirth?: string;
  provider?: string;
  location?: Location;
  address?: string;
  phones?: Phone[];
  phone?: string;
  roles?: UserRole[];
  permissions?: UserPermission[];
  garages?: Garage[];
  verificationCodes?: VerificationCode[];
  paymentOptions?: PaymentOption[];
  profileImageUrl?: string | undefined;
}

export interface VerificationCode {
  code: string;
  user: string;
  expiryDate: string;
  complete: string;
  type: string;
}
export enum ServiceCenterCategories {
  GENERAL_MAINTENANCE = "GENERAL_MAINTENANCE",
}
export interface ServiceCenter extends GenericType {
  name?: string;
  description?: string;
  category?: ServiceCenterCategories.GENERAL_MAINTENANCE;
  location?: Location;
  ownerId?: string;
  services?: Service[];
  imageId?: string;
  imageUrl?: string;
  available?: boolean | null;
}

export interface ServiceCenterResponse extends GenericResponse {
  data: ServiceCenter;
}
export interface UpdateServiceCenterImagesRequest extends GenericResponse {
  data: FormData | Record<string, any>;
  id: string;
}
export interface ServiceCentersResponse extends GenericResponse {
  data: ServiceCenter[];
}

export interface Service extends GenericType {
  title: string;
  image: string;
  definition: string;
  serviceCenterId: string;
  serviceCenter?: ServiceCenter;
}

export interface Appointment extends GenericType {
  date?: string;
  locationType?: "HOME" | "OFFICE" | "OTHER";
  note?: string | null;
  serviceId?: string;
  service?: Service;
  status?: AppointmentStatus;
  vehicleId?: string;
  timeOfDay?: string;
  location?: Location;
  vehicle?: Vehicle;
  user?: User;
  serviceCenter?: ServiceCenter;
  chatRoom?: ChatRoom
}

export interface LoginResponse extends GenericResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    refreshTokenExpiry: number;
    authorities: {
      userId: string;
      authorities: {
        ROLE: string[];
        PERMISSION: string[];
      };
      authoritiesClear: {
        ROLE: string[];
        PERMISSION: string[];
      };
    };
  };
}
export interface LoginRequest {
  email: string;
  password: string;
  extend?: boolean;
}
export interface ForgotPasswordRequest {
  email: string;
  phone?: {
    code: string;
    number: string;
  };
}
export interface ResetPasswordRequest {
  email?: string;
  code?: string;
  oldPassword: string;
  newPassword: string;
}

type Pagination = {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

type Audit = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
};
export interface AppointmentRequest {
  audit?: Audit;
  pagination?: Pagination;
  dateBefore?: string;
  dateAfter?: string;
  locationType?: string;
  status?: AppointmentStatus;
  serviceId?: string;
  serviceCenterId?: string;
  vehicleId?: string;
  garageId?: string;
  convertStatusToTypeAppointmentStatus?: "NOT_STARTED";
}
export interface UpdateAppointmentRequest {
  id: string;
  data: Appointment;
}

export interface UpdateAppointmentStatusRequest {
  id: string;
  status: AppointmentStatus;
}
export interface AppointmentsResponse extends GenericResponse {
  data: Appointment[];
}
export interface AppointmentResponse extends GenericResponse {
  data: Appointment;
}

//payment
export interface Payment extends GenericType {
  money: {
    amount: number;
    currency: string;
  };
  dueDate: string;
  paymentDate: string;
  appointmentId: string;
  paymentMethod: "CASH";
  invoiceId: string;
  orderId: string;
  paymentOption: string;
  userFrom: "User";
  userTo: "Manager";
  amount: string;
  paymentMethodName: string;
}

export interface PaymentsResponse extends GenericResponse {
  data: Payment[];
}

export interface PaymentRequest {
  audit?: Audit;
  pagination?: Pagination;
  paymentDateBefore?: string;
  paymentDateAfter?: string;
  paymentMethod?: "Credit Card" | "Cash" | "Mobile Money";
  invoiceId?: string;
}

export interface BarChartItemType {
  name: string;
  value: number;
}

export type DateRange = "WEEK" | "DAY" | "MONTH" | "YEAR";

export interface AppointmentStatsRequest {
  startDate: string;
  endDate: string;
  range: DateRange;
}
export interface AppointmentStatsResponse extends GenericResponse {
  data: {
    range: DateRange;
    currentStats: {
      SUNDAY: number;
      TUESDAY: number;
    };
    percentageChange: {
      SUNDAY: number;
      TUESDAY: number;
    };
    previousStats: {
      SUNDAY: number;
      TUESDAY: number;
    };
  };
}

export interface Money {
  amount: number;
  currency: string;
}

export interface InvoiceItem extends Audit {
  name: string;
  price: string;
  quantity: number;
  total?: string;
}

export interface Invoice extends Audit {
  number: string;
  money?: Money;
  issueDate: string;
  dueDate: string;
  paidDate: string;
  appointment?: Appointment;
  appointmentId: string;
  items: InvoiceItem[];
  billedFromUserId: string;
  billedToUserId: string;
  vehicleId: string;
  billedFrom?: User;
  billedTo?: User;
  isPaid: boolean;
  status: InvoiceStatus;
  serviceId: string;
  garageId: string;
  garageOwnerId: string;
  totalAmount: string;
  tax?: string;
  paymentMethod?: string;
}

export interface CreateInvoiceRequest {
  appointmentId: string;
  vehicleId: string;
  money: {
    amount: number;
    currency: string;
  };
  issueDate: string;
  dueDate: string;
  billedFromUserId: string;
  billedToUserId: string;
  items: InvoiceItem[];
}

export interface InvoicesResponse extends GenericResponse {
  data: Invoice[];
}
export interface GetInvoicesRequest {
  status: InvoiceStatus;
}
export interface InvoiceResponse extends GenericResponse {
  data: Invoice;
}
export interface UpdateInvoiceRequest extends GenericResponse {
  data: Invoice;
  id: string;
}

export interface UsersResponse extends GenericResponse {
  data: User[];
}
export interface UserResponse extends GenericResponse {
  data: User;
}

export type UpdateImageRequest = {
  id: string;
  data: FormData;
};
export type UpdatePasswordAdmin = {
  id: string;
  data: ResetPasswordRequest;
};

export interface ServiceResponse extends GenericResponse {
  data: Service;
}

export interface ServiceCenterService extends GenericType {
  serviceCenter: ServiceCenter;
  service: Service;
  price: number;
  durationMinutes: number;
  available: boolean;
}

export interface ServiceCenterServicesResponse extends GenericResponse {
  data: ServiceCenterService[];
}

export interface ChatRoom extends Audit {
  id: string;
  name: string;
  participentIds: string[];
}

export interface Message {
  message?: string;
  image?: string;
  reply?: string;
  isMe?: boolean;
  type?: MessageType;
  senderId?: string;
  content?: string | any;
  chatRoomId?: string;
  id?: string;
  timestamp?: string | Date;
  appointmentId?: string;
  mediaUrl?: null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ChatRoomsResponse extends GenericResponse {
  data: ChatRoom[];
}
export interface ChatRoomResponse extends GenericResponse {
  data: ChatRoom;
}
export interface UpdateChatRoomRequest extends GenericType {
  data: ChatRoom;
  id: string;
}
export interface CreateChatRoomRequest {
  id: string;
  name: string;
  participantUserIds: string[];
  participantUserIdsAsUuids?: string[];
  idAsUuid?: string;
}

export interface ChatRoomParticipantsResponse extends GenericResponse {
  data: {
    id: string;
    user: User;
    chatRoom: ChatRoom;
  }[];
}
export interface ChatRoomMessagesResponse extends GenericResponse {
  data: Message[];
}

export interface InvoiceDataType {
  key: string;
  item: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

export interface AppointmentChatRoom extends GenericType {
  appointmentDTO: null;
  id: string;
  name: string;
  participantIds: null;
}

export interface AppointmentChatRoomResponse extends GenericResponse {
  data: AppointmentChatRoom;
}

export interface InvoiceData {
  billedTo: {
    name?: string;
    email?: string;
    location?: string;
    phone?: string;
  };
  billedFrom: {
    name?: string;
    email?: string;
    location?: string;
    phone?: string;
  };
  vehicle: {
    make?: string;
    model?: string;
    trim?: string;
    year?: string;
    vin: string;
    regNumber: string;
  };
  issueDate: string;
  dueDate: string;
  items: {
    name: string;
    quantity: string;
    price: string;
  }[];
  total: number;
  subTotal: number;
  tax: number;
}


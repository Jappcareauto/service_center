/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppointmentStatus, InvoiceStatus, MessageType } from "@/enums";

export const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
];

export const AUDIO_TYPES = [
  "audio/mpeg", // mp3
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/mp4",
  "audio/aac",
  "audio/x-aac",
  "audio/x-wav",
  "audio/x-m4a",
  "audio/x-ms-wma",
];

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
  id: string;
  imageUrl: string;
  make: string;
  model: string;
  name: string;
  registrationNumber: string;
  description: string;
  vin: string;
  year: string;
  trim: string;
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
export interface User extends GenericType {
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
  phoneNumber?: string | null;
  appointmentId?: string;
  chatRoomId?: null;
  vehicleName?: string;
  vehicleRegistrationNumber?: string;
  serviceName?: string;
  appointmentStatus?: AppointmentStatus;
  appointmentDate?: string;
  online?: boolean;
  lastSeen?: string;
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
  BODY_SHOP = "BODY_SHOP",
}
export interface ServiceCenter extends GenericType {
  id?: string;
  category?: ServiceCenterCategories;
  name?: string;
  description?: string;
  location?: Location;
  ownerId?: string;
  services?: Service[];
  imageId?: string;
  imageUrl?: string;
  available?: boolean | null;
  latitude?: number;
  longitude?: number;
  locationName?: string;
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
export interface ServiceCenterResponse extends GenericResponse {
  data: ServiceCenter;
}

export interface Service extends GenericType {
  title: string;
  id: string;
  description: string;
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
  chatRoom?: ChatRoom;
  chatRoomId?: string;
  diagnosesToMake?: string;
  diagnosesMade?: string;
}

export interface DiagnosisToMakeRequest {
  id: string;
  diagnosesToMake: string;
}
export interface DiagnosisMadeRequest {
  id: string;
  diagnosesMade: string;
}

export interface LoginResponse extends GenericResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    serviceCenterId: string;
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
  status?: AppointmentStatus | "";
  page?: number;
  limit?: number;
  search?: string;
}
export interface InvoiceRequest {
  status?: InvoiceStatus;
  page?: number;
  size?: number;
  dueDateAfter?: string;
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
export interface billedFrom {
  address?: string;
  email: string;
  name: string;
  phone?: string;
  phoneNumber?: string;
}
export interface Invoice extends Audit {
  number: string;
  money?: Money;
  status?: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate: string;
  appointmentId: string;
  serviceCenterId?: string;
  serviceCenterOwnerId?: string;
  garageOwnerId?: string;
  serviceId?: string;
  vehicleId?: string;
  totalAmount?: string;
  billedFromUserId: string;
  billedToUserId: string;
  items: InvoiceItem[];
  billedTo: billedFrom;
  billedFrom: billedFrom;
  vehicle?: Vehicle;
}

export interface CreateInvoiceRequest {
  appointmentId: string;
  money: {
    amount: number;
    currency: string;
  };
  issueDate: string;
  dueDate: string;
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
  timestamp?: string;
  appointmentId?: string;
  mediaUrls?: UploadedFile[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status?: "SENT" | "DELIVERED" | "READ";
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

export enum ChatRoomType {
  SINGLE = "SINGLE",
  GROUP = "GROUP",
}
export interface CreateChatRoomRequest {
  chatName: string;
  chatDescription?: string;
  type: ChatRoomType;
  userIds: string[];
  creatorId: string;
  appointmentId?: string;
}

export interface UploadedFile {
  url: string;
  type: string;
  name: string;
}
export interface UploadChatFilesResponse extends GenericResponse {
  data: UploadedFile[];
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
export interface Contacts extends GenericType {
  contactType: "CUSTOMERS";
  serviceCenters: null;
  customers: User[];
}
export interface ContactsResponse extends GenericResponse {
  data: Contacts;
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
  billedTo: billedFrom;
  billedFrom: billedFrom;
  vehicle: {
    make?: string;
    model?: string;
    registrationNumber?: string;
    year?: string;
    vin: string;
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

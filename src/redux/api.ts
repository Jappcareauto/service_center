/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/config";
import { URLS } from "@/config/urls";
import { AppointmentStatus } from "@/enums";
import {
  AppointmentChatRoomResponse,
  AppointmentRequest,
  AppointmentResponse,
  AppointmentsResponse,
  AppointmentStatsRequest,
  AppointmentStatsResponse,
  ChatRoomMessagesResponse,
  ChatRoomParticipantsResponse,
  ChatRoomResponse,
  ChatRoomsResponse,
  ContactsResponse,
  CreateChatRoomRequest,
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  DiagnosisMadeRequest,
  DiagnosisToMakeRequest,
  ForgotPasswordRequest,
  GenericResponse,
  InvoiceRequest,
  InvoiceResponse,
  InvoicesResponse,
  LoginRequest,
  LoginResponse,
  PaymentRequest,
  PaymentsResponse,
  ResetPasswordRequest,
  ServiceCenter,
  ServiceCenterResponse,
  ServiceCenterServicesResponse,
  ServiceCentersResponse,
  ServiceResponse,
  UpdateAppointmentRequest,
  UpdateAppointmentStatusRequest,
  UpdateChatRoomRequest,
  UpdateImageRequest,
  UpdateInvoiceRequest,
  UpdatePasswordAdmin,
  UpdateServiceCenterImagesRequest,
  UploadChatFilesResponse,
  User,
  UserResponse,
  UsersResponse,
} from "@/types";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  logoutUser,
  setAccessToken,
  setRefreshToken,
} from "./features/auth/authSlice";
import store, { RootState } from "./store";

const onQueryStartedErrorToast = async (_: any, { queryFulfilled }: any) => {
  await queryFulfilled;
};
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const authState = (store.getState() as RootState).auth;

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === "FETCH_ERROR") {
    return result;
  }
  if (result.error?.status !== 401) return result;

  const { refreshToken } = authState;
  if (!refreshToken) {
    store.dispatch(logoutUser());
    return result;
  }

  const refreshResponse = (await baseQuery(
    {
      url: "/auth/refresh-token/",
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions
  )) as { data?: { data?: { accessToken: string; refreshToken: string } } };

  if (
    refreshResponse.data?.data?.accessToken &&
    refreshResponse.data?.data?.refreshToken
  ) {
    store.dispatch(setAccessToken(refreshResponse.data.data.accessToken));
    store.dispatch(setRefreshToken(refreshResponse.data.data.refreshToken));

    result = await baseQuery(args, api, extraOptions);
  } else {
    store.dispatch(logoutUser());
    return { error: { status: 401, data: "Unauthorized" } };
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "auth",
    "appointment",
    "payment",
    "emergency",
    "invoice",
    "user",
    "service_center",
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: URLS.auth.login,
          method: "POST",
          body: credentials,
        };
      },
      onQueryStarted: onQueryStartedErrorToast,
    }),
    registerUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (userData) => {
        return {
          url: URLS.auth.register,
          method: "POST",
          body: userData,
        };
      },
      onQueryStarted: onQueryStartedErrorToast,
    }),
    forgotPassword: builder.mutation<GenericResponse, ForgotPasswordRequest>({
      query: (userData) => {
        return {
          url: URLS.auth.forgotPassword,
          method: "POST",
          body: userData,
        };
      },
      onQueryStarted: onQueryStartedErrorToast,
    }),
    resetPassword: builder.mutation<GenericResponse, ResetPasswordRequest>({
      query: (userData) => {
        return {
          url: URLS.auth.resetPassword,
          method: "POST",
          body: userData,
        };
      },
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAppointments: builder.query<AppointmentsResponse, AppointmentRequest>({
      query: ({ status, page, limit, search }) => {
        return {
          url: URLS.appointment.getAppointments(
            status as AppointmentStatus,
            page,
            limit,
            search
          ),
          method: "GET",
        };
      },
      providesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAppointment: builder.query<AppointmentResponse, string>({
      query: (id) => {
        return {
          url: URLS.appointment.getAppointment(id),
          method: "GET",
        };
      },
      providesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getChatroomByAppointment: builder.query<
      AppointmentChatRoomResponse,
      string
    >({
      query: (id) => {
        return {
          url: URLS.chat.getChatroomByAppointment(id),
          method: "GET",
        };
      },
      providesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAppointmentByChatroom: builder.query<AppointmentResponse, string>({
      query: (id) => {
        return {
          url: URLS.chat.getAppointmentByChatroom(id),
          method: "GET",
        };
      },
      providesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createAppointment: builder.mutation<GenericResponse, AppointmentRequest>({
      query: (data) => {
        return {
          url: URLS.appointment.createAppointment,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateAppointment: builder.mutation<
      GenericResponse,
      UpdateAppointmentRequest
    >({
      query: (data) => {
        return {
          url: URLS.appointment.updateAppointment(data.id),
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    deleteAppointment: builder.mutation<GenericResponse, string>({
      query: (id) => {
        return {
          url: URLS.appointment.deleteAppointment(id),
          method: "DELETE",
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateAppointmentStatus: builder.mutation<
      GenericResponse,
      UpdateAppointmentStatusRequest
    >({
      query: ({ id, status }) => {
        return {
          url: URLS.appointment.updateAppointmentStatus(id),
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    declineAppointment: builder.mutation<GenericResponse, string>({
      query: (id) => {
        return {
          url: URLS.appointment.declineAppointment(id),
          method: "PUT",
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    completeAppointment: builder.mutation<GenericResponse, string>({
      query: (id) => {
        return {
          url: URLS.appointment.completeAppointment(id),
          method: "PUT",
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    acceptAppointment: builder.mutation<GenericResponse, string>({
      query: (id) => {
        return {
          url: URLS.appointment.acceptAppointment(id),
          method: "PUT",
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    diagnosisToMake: builder.mutation<GenericResponse, DiagnosisToMakeRequest>({
      query: (data) => {
        return {
          url: URLS.appointment.diagnosisToMake,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    diagnosisMade: builder.mutation<GenericResponse, DiagnosisMadeRequest>({
      query: (data) => {
        return {
          url: URLS.appointment.diagnosisMade,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAppointmentStatsByDate: builder.mutation<
      AppointmentStatsResponse,
      AppointmentStatsRequest
    >({
      query: (data) => {
        return {
          url: URLS.appointment.getAppointmentStatsByDate,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getPayments: builder.query<PaymentsResponse, PaymentRequest>({
      query: ({ size, page, status }) => {
        // console.log(status)
        return {
          url: URLS.payment.getPayments(
            page,
            size,
            status
          ),
          method: "GET",
        };
      },
      providesTags: ["appointment"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getEmergencies: builder.mutation<any, any | object>({
      query: (data) => {
        return {
          url: URLS.emergency.getEmergencies,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["emergency"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getEmergency: builder.query<any, string>({
      query: (id) => {
        return {
          url: URLS.emergency.getEmergency(id),
          method: "GET",
        };
      },
      providesTags: ["emergency"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createEmergency: builder.mutation<GenericResponse, any>({
      query: (data) => {
        return {
          url: URLS.emergency.createEmergency,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["emergency"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateEmergencyStatus: builder.mutation<GenericResponse, string>({
      query: (id) => {
        return {
          url: URLS.emergency.updateEmergencyStatus(id),
          method: "PUT",
        };
      },
      invalidatesTags: ["emergency"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getInvoices: builder.query<InvoicesResponse, InvoiceRequest>({
      query: ({ status, page, size, dueDateAfter }) => {
        return {
          url: URLS.invoice.getInvoices(status, page, size, dueDateAfter),
          method: "GET",
        };
      },
      providesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createInvoice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
      query: (data) => {
        return {
          url: URLS.invoice.createInvoice,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getInvoiceByAppointment: builder.query<InvoiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.invoice.getInvoiceByAppointment(id),
          method: "GET",
        };
      },
      providesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateInvoice: builder.mutation<GenericResponse, UpdateInvoiceRequest>({
      query: ({ id, ...data }) => {
        return {
          url: URLS.invoice.updateInvoice(id),
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    deleteInvoice: builder.mutation<InvoiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.invoice.deleteInvoice(id),
          method: "DELETE",
        };
      },
      invalidatesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateInvoiceStatus: builder.mutation<InvoiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.invoice.updateInvoiceStatus(id),
          method: "PUT",
        };
      },
      invalidatesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    downloadInvoice: builder.query<InvoiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.invoice.downloadInvoice(id),
          method: "GET",
        };
      },
      providesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getInvoiceReport: builder.query<InvoiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.invoice.getInvoiceReport(id),
          method: "GET",
        };
      },
      providesTags: ["invoice"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getUsers: builder.mutation<UsersResponse, object>({
      query: (data = {}) => {
        return {
          url: URLS.user.getUsers,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createUser: builder.mutation<UserResponse, User>({
      query: (data) => {
        return {
          url: URLS.user.createUser,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getUser: builder.query<UserResponse, string>({
      query: (id) => {
        return {
          url: URLS.user.getUser(id),
          method: "GET",
        };
      },
      providesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updatePassword: builder.mutation<UserResponse, ResetPasswordRequest>({
      query: (data) => {
        return {
          url: URLS.user.updatePassword,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updatePasswordAdmin: builder.mutation<UserResponse, UpdatePasswordAdmin>({
      query: (data) => {
        return {
          url: URLS.user.updatePasswordAdmin(data?.id),
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateUserImage: builder.mutation<UserResponse, UpdateImageRequest>({
      query: (data) => {
        return {
          url: URLS.user.updateUserImage(data?.id),
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getService: builder.query<ServiceResponse, string>({
      query: (id) => {
        return {
          url: URLS.service.getService(id),
          method: "GET",
        };
      },
      providesTags: ["user"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getChatRooms: builder.mutation<ChatRoomsResponse, object>({
      query: (data) => {
        return {
          url: URLS.chat.getChatrooms,
          method: "POST",
          body: data,
        };
      },
    }),
    getChatRoom: builder.query<ChatRoomResponse, string>({
      query: (id) => {
        return {
          url: URLS.chat.getChatroom(id),
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    createChatRoom: builder.mutation<ChatRoomResponse, CreateChatRoomRequest>({
      query: (data) => {
        return {
          url: URLS.chat.createChatroom,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    updateChatRoom: builder.mutation<ChatRoomResponse, UpdateChatRoomRequest>({
      query: (data) => {
        return {
          url: URLS.chat.updateChatroom(data.id),
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteChatRoom: builder.mutation<ChatRoomResponse, string>({
      query: (id) => {
        return {
          url: URLS.chat.deleteChatroom(id),
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
    getUserChatRooms: builder.query<ChatRoomsResponse, string>({
      query: (id) => {
        return {
          url: URLS.chat.getUserChatrooms(id),
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getChatroomPartcipants: builder.query<ChatRoomParticipantsResponse, string>(
      {
        query: (id) => {
          return {
            url: URLS.chat.getChatroomPartcipants(id),
            method: "GET",
          };
        },
        providesTags: ["user"],
      }
    ),
    getChatroomMessages: builder.query<ChatRoomMessagesResponse, string>({
      query: (id) => {
        return {
          url: URLS.chat.getChatroomMessages(id),
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getChatContacts: builder.query<ContactsResponse, undefined>({
      query: () => {
        return {
          url: URLS.service_Center.getChatContacts,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    uploadChatFiles: builder.mutation<UploadChatFilesResponse, FormData>({
      query: (data) => {
        return {
          url: URLS.chat.uploadChatFiles,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    getServiceCenters: builder.mutation<
      ServiceCentersResponse,
      ServiceCenter | Record<string, any>
    >({
      query: (data) => {
        return {
          url: URLS.service_Center.getServiceCenters,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["service_center"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getServiceCenter: builder.query<ServiceCenterResponse, string>({
      query: (id: string) => {
        return {
          url: URLS.service_Center.getServiceCenter(id),
          method: "GET",
        };
      },
      providesTags: ["service_center"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateServiceCenterImage: builder.mutation<
      GenericResponse,
      UpdateServiceCenterImagesRequest
    >({
      query: (data) => {
        return {
          url: URLS.service_Center.updateServiceCenterImage(data.id),
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["service_center"],
    }),
    updateServiceCenter: builder.mutation<
      GenericResponse,
      UpdateServiceCenterImagesRequest
    >({
      query: (data) => {
        return {
          url: URLS.service_Center.updateServiceCenter(data.id),
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["service_center"],
    }),
    addServiceCenterMedia: builder.mutation<
      GenericResponse,
      UpdateServiceCenterImagesRequest
    >({
      query: (data) => {
        return {
          url: URLS.service_Center.addServiceCenterMedia(data.id),
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["service_center"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getServiceCenterServices: builder.query<
      ServiceCenterServicesResponse,
      string
    >({
      query: (id) => {
        return {
          url: URLS.service_Center.getServiceCenterServices(id),
          method: "GET",
        };
      },
      providesTags: ["service_center"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useAcceptAppointmentMutation,
  useDeclineAppointmentMutation,
  useCompleteAppointmentMutation,
  useGetPaymentsQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useGetAppointmentStatsByDateMutation,
  useDiagnosisMadeMutation,
  useDiagnosisToMakeMutation,
  useGetEmergenciesMutation,
  useGetEmergencyQuery,
  useCreateEmergencyMutation,
  useCreateAppointmentMutation,
  useUpdateEmergencyStatusMutation,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useGetInvoiceByAppointmentQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useDownloadInvoiceQuery,
  useGetInvoiceReportQuery,
  useGetUsersMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdatePasswordAdminMutation,
  useUpdatePasswordMutation,
  useUpdateUserImageMutation,
  useGetServiceQuery,
  useGetChatRoomsMutation,
  useGetChatRoomQuery,
  useCreateChatRoomMutation,
  useUpdateChatRoomMutation,
  useDeleteChatRoomMutation,
  useGetUserChatRoomsQuery,
  useGetChatroomMessagesQuery,
  useGetChatroomPartcipantsQuery,
  useGetServiceCentersMutation,
  useGetServiceCenterQuery,
  useUpdateServiceCenterImageMutation,
  useUpdateServiceCenterMutation,
  useAddServiceCenterMediaMutation,
  useGetChatroomByAppointmentQuery,
  useGetAppointmentByChatroomQuery,
  useUploadChatFilesMutation,
  useGetServiceCenterServicesQuery,
  useGetChatContactsQuery,
} = apiSlice;

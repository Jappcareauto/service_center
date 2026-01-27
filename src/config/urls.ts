import { AppointmentStatus, InvoiceStatus } from "@/enums";

export const URLS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refreshToken: "/auth/refresh-token",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
  },
  user: {
    getUsers: "/user/list",
    createUser: "/user/create",
    getLoggedInUser: "/user/logged-in",
    getUser: (id: string) => `/user/by-id/${id}`,
    updatePassword: "/user/update-password",
    updateUserImage: (id: string) => `/user/${id}/update-image`,
    updatePasswordAdmin: (id: string) => `/user/${id}/update-password`,
  },
  appointment: {
    getAppointments: (
      status?: AppointmentStatus,
      page?: number,
      limit?: number,
      search?: string
    ) =>
      `/appointment/list?status=${status ?? ""}&page=${page ?? ""}&limit=${
        limit ?? ""
      }&search=${search ?? ""}`,
    getAppointmentStats: "/appointment/stats",
    getAppointment: (id: string) => `/appointment/${id}`,
    createAppointment: "/appointment",
    updateAppointment: (id: string) => `/appointment/${id}`,
    deleteAppointment: (id: string) => `/appointment/${id}`,
    updateAppointmentStatus: (id: string) => `/appointment/${id}/status`,
    declineAppointment: (id: string) => `/appointment/${id}/status/decline`,
    completeAppointment: (id: string) => `/appointment/${id}/status/complete`,
    acceptAppointment: (id: string) => `/appointment/${id}/status/accept`,
    getAppointmentStatsByDate: `/appointment/stats`,
    diagnosisToMake: `/appointment/update-diagnosis-to-make`,
    diagnosisMade: "/appointment/update-diagnosis-made",
  },
  payment: {
    getPayments: (page?: number, size?: number, status?: string) =>
      `/payment?size=${size ?? ""}&page=${page ?? ""}&status=${status ?? ""}`,
    getPayment: (id: string) => `/payment/${id}`,
    createPayment: "/payment",
    paymentForOrder: (id: string) => `/payment/order/${id}`,
    paymentForInvoice: (id: string) => `/payment/invoice/${id}`,
    deletePayment: (id: string) => `/payment/${id}`,
  },
  emergency: {
    getEmergencies: "/emergency-assistance/list",
    getEmergency: (id: string) => `/emergency-assistance/${id}`,
    createEmergency: "/emergency-assistance",
    updateEmergencyStatus: (id: string) => `/emergency-assistance/${id}/status`,
  },
  invoice: {
    getInvoices: (
      status?: InvoiceStatus,
      page?: number,
      size?: number,
      dueDateAfter?: string
    ) =>
      `/invoice/list?status=${status ?? ""}&page=${page ?? ""}&size=${
        size ?? ""
      }&dueDateAfter=${dueDateAfter ?? ""}`,
    getInvoiceByAppointment: (appointmentId: string) =>
      `/invoice/${appointmentId}`,
    createInvoice: "/invoice",
    updateInvoice: (id: string) => `/invoice/${id}`,
    deleteInvoice: (id: string) => `/invoice/${id}`,
    markInvoiceAsPaid: (id: string) => `/invoice/${id}/mark-paid`,
    updateInvoiceStatus: (id: string) => `/invoice/${id}/update-status`,
    downloadInvoice: (id: string) => `/invoice/${id}/document`,
    getInvoiceReport: (id: string) => `/invoice/${id}/document-model`,
  },
  service: {
    getService: (id: string) => `/service/${id}`,
  },
  chat: {
    getChatrooms: "/chatroom/list",
    getChatroom: (id: string) => `/chatroom/${id}`,
    createChatroom: "/chatroom",
    updateChatroom: (id: string) => `/chatroom/${id}`,
    deleteChatroom: (id: string) => `/chatroom/${id}`,
    getUserChatrooms: (userId: string) => `/chatroom/user/${userId}`,
    getChatroomMessages: (chatroomId: string) =>
      `/chat/message/chatroom/${chatroomId}`,
    getChatroomPartcipants: (chatroomId: string) =>
      `/chat-participant/chatroom/${chatroomId}`,
    chatroomUrl: (chatroomId: string) => `/chat/chatroom/${chatroomId}`,
    getChatroomByAppointment: (appointmentId: string) =>
      `/chatroom/appointment/${appointmentId}`,
    getAppointmentByChatroom: (chatroomId: string) =>
      `/appointment/chat-room/${chatroomId}`,
    uploadChatFiles: "/file/chat-upload-multiple",
  },
  service_Center: {
    getServiceCenters: "/service-center/list",
    getServiceCenter: (id: string) => `/service-center/${id}`,
    updateServiceCenterImage: (id: string) =>
      `/service-center/${id}/update-image`,
    updateServiceCenter: (id: string) => `/service-center/${id}`,
    addServiceCenterMedia: (id: string) =>
      `/service-center/add-media-to-service-center/${id}/update`,
    getServiceCenterServices: (id: string) => `/service-centers/${id}/services`,
    getChatContacts: "/service-center/chat-contacts",
  },
};

export const URLS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    refreshToken: "/api/v1/auth/refresh-token",
    resetPassword: "/api/v1/auth/reset-password",
    forgotPassword: "/api/v1/auth/forgot-password",
  },
  user: {
    getUsers: "/api/v1/user/list",
    createUser: "/api/v1/user/create",
    getLoggedInUser: "/api/v1/user/logged-in",
    getUser: (id: string) => `/api/v1/user/by-id/${id}`,
    updatePassword: "/api/v1/user/update-password",
    updateUserImage: (id: string) => `/api/v1/user/${id}/update-image`,
    updatePasswordAdmin: (id: string) => `/api/v1/user/${id}/update-password`,
  },
  appointment: {
    getAppointments: "/api/v1/appointment/list",
    getAppointmentStats: "/api/v1/appointment/stats",
    getAppointment: (id: string) => `/api/v1/appointment/${id}`,
    createAppointment: "/api/v1/appointment",
    updateAppointment: (id: string) => `/api/v1/appointment/${id}`,
    deleteAppointment: (id: string) => `/api/v1/appointment/${id}`,
    updateAppointmentStatus: (id: string) => `/api/v1/appointment/${id}/status`,
    declineAppointment: (id: string) => `/api/v1/appointment/${id}/status/decline`,
    completeAppointment: (id: string) => `/api/v1/appointment/${id}/status/complete`,
    acceptAppointment: (id: string) => `/api/v1/appointment/${id}/status/accept`,
    getAppointmentStatsByDate: `/api/v1/appointment/stats`,
  },
  payment: {
    getPayments: "/api/v1/payment/list",
    getPayment: (id: string) => `/api/v1/payment/${id}`,
    createPayment: "/api/v1/payment",
    paymentForOrder: (id: string) => `/api/v1/payment/order/${id}`,
    paymentForInvoice: (id: string) => `/api/v1/payment/invoice/${id}`,
    deletePayment: (id: string) => `/api/v1/payment/${id}`,
  },
  emergency: {
    getEmergencies: "/api/v1/emergency-assistance/list",
    getEmergency: (id: string) => `/api/v1/emergency-assistance/${id}`,
    createEmergency: "/api/v1/emergency-assistance",
    updateEmergencyStatus: (id: string) => `/api/v1/emergency-assistance/${id}/status`,
  },
  invoice: {
    getInvoices: "/api/v1/invoice/list",
    getInvoiceByAppointment: (appointmentId: string) =>
      `/api/v1/invoice/${appointmentId}`,
    createInvoice: "/api/v1/invoice",
    updateInvoice: (id: string) => `/api/v1/invoice/${id}`,
    deleteInvoice: (id: string) => `/api/v1/invoice/${id}`,
    markInvoiceAsPaid: (id: string) => `/api/v1/invoice/${id}/mark-paid`,
    updateInvoiceStatus: (id: string) => `/api/v1/invoice/${id}/update-status`,
    downloadInvoice: (id: string) => `/api/v1/invoice/${id}/document`,
    getInvoiceReport: (id: string) => `/api/v1/invoice/${id}/document-model`,
  },
  service: {
    getService: (id: string) => `/api/v1/service/${id}`,
  },
  chat: {
    getChatrooms: "/api/v1/chatroom/list",
    getChatroom: (id: string) => `/api/v1/chatroom/${id}`,
    createChatroom: "/api/v1/chatroom",
    updateChatroom: (id: string) => `/api/v1/chatroom/${id}`,
    deleteChatroom: (id: string) => `/api/v1/chatroom/${id}`,
    getUserChatrooms: (userId: string) => `/api/v1/chatroom/user/${userId}`,
    getChatroomMessages: (chatroomId: string) =>
      `/chat/message/chatroom/${chatroomId}`,
    getChatroomPartcipants: (chatroomId: string) =>
      `/api/v1/chat-participant/chatroom/${chatroomId}`,
    chatroomUrl: (chatroomId: string) => `/api/v1/chat/chatroom/${chatroomId}`,
    getChatroomByAppointment: (appointmentId: string) =>
      `/api/v1/chatroom/appointment/${appointmentId}`,
  },
  service_Center: {
    getServiceCenters: "/api/v1/service-center/list",
    updateServiceCenterImage: (id: string) =>
      `/api/v1/service-center/${id}/update-image`,
    updateServiceCenter: (id: string) => `/api/v1/service-center/${id}/update`,
    addServiceCenterMedia: (id: string) =>
      `/api/v1/service-center/add-media-to-service-center/${id}/update`,
    getServiceCenterServices: (id: string) => `/api/v1/service-centers/${id}/services`,
  },
};

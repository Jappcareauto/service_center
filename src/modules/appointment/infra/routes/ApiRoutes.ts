export const AppointmentApiRoutes = {
  getById: (id: string) => `/appointment/${id}`,
  update: (id: string) => `/appointment/${id}`,
  delete: (id: string) => `/appointment/${id}`,
  getAll: () => `/appointment/list`,
  create: () => `/appointment`,
  updateStatus: (id: string) => `/appointment/${id}/status`,
  getStatus: () => `/appointment/status`,
};

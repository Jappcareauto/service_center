export const AppointmentApiRoutes = {
  getById: (id: string) => `/appointments/${id}`,
  update: (id: string) => `/appointments/${id}`,
  delete: (id: string) => `/appointments/${id}`,
  getAll: () => `/appointment/list`,
  create: () => `/appointments`,
  updateStatus: (id: string) => `/appointments/${id}/status`,
  getStatus: () => `/appointments/status`,
};

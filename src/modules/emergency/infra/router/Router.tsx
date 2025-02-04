import { EmergencyStatus } from "../../ui/models/EmergencyStatus";

export const emergencyApiRoutes = {
  findAll: () => "/emergency-assistance/list",
  updateStatus: (id: string, status: EmergencyStatus) =>
    `/emergency-assistance/${id}/status?status=${status}`,
};

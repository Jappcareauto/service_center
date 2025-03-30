import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/api-client";

export const useUserProfile = () => {
    return useQuery({
      queryKey: ['currentUser'],
      queryFn: () => apiClient.get("/user/logged-in"),
      enabled: !!localStorage.getItem("AUTH_ACCESS"),// Only fetch if logged in
    });
  };
  
  // src/hooks/useServiceCenter.ts
  export const useServiceCenter = (userId?: string) => {
    return useQuery({
      queryKey: ['serviceCenter', userId],
      queryFn: () => apiClient.get(`/service-center?ownerId=${userId}`),
      enabled: !!userId, // Only fetch if userId exists
    });
  };
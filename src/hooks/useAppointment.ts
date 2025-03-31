import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { setErrorMessage } from "@/redux/messagesSlice";
import { useEffect } from "react";

export const useAppointment = () => {
    const dispatch = useAppDispatch();
    const currentServiceCenter = useAppSelector((state) => state.serviceCenter.currentServiceCenter);

    const { data, error, isError } = useQuery({
        queryKey: ['appointments', currentServiceCenter],
        queryFn: () => apiClient.get(`/appointments/service-center/${currentServiceCenter?.id}`),
        enabled: !!currentServiceCenter, 
    });

    // Handle success
    useEffect(() => {
        if (data) {
            console.log(data)
            console.log(data.data.data);
        }
    }, [data]);

    // Handle error
    useEffect(() => {
        if (isError) {
            console.log("Error fetching appointments", error);
            dispatch(setErrorMessage("Failed to fetch appointments."));
        }
    }, [isError, dispatch]);

    return { data, error };
};
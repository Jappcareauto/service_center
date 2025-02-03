import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { emergencySelector } from "../../slices/selector";
import { useEffect } from "react";
import { findAllEmergencyAsync } from "./findAllEmegencyAsync";

export const useFindAllEmergency = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => emergencySelector.loading(state));
  const emergency = useAppSelector((state) =>
    emergencySelector.emergencyWithAll(state)
  );

  const onFindAllEmergency = async () => {
    const response = await dispatch(findAllEmergencyAsync()).unwrap();
    console.log("response", response);
  };

  useEffect(() => {
    onFindAllEmergency();
  }, []);

  return {
    state: {
      loading,
      emergency,
    },
  };
};

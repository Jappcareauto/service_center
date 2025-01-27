import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { serviceCenterSelector } from "@/modules/service/slice/selectors";
import { userSelector } from "@/modules/user/slice/selectors";
import { findSelfAsync } from "@/modules/user/usecase/findSelf/findSelfAsync";
import { useEffect } from "react";

const useProfilView = () => {
  const mySelfState = useAppSelector(userSelector.mySelfState);
  const servicesCenterState = useAppSelector(
    serviceCenterSelector.serviceCenterState
  );
  const dispatch = useAppDispatch();

  const fetchMyself = async () => {
    const response = await dispatch(findSelfAsync()).unwrap();
    console.log("response", response);
  };

  useEffect(() => {
    fetchMyself();
  }, []);

  return {
    state: {
      mySelfState: {
        myself: mySelfState.mySelf,
        loading: mySelfState.loading,
      },
      servicesCenterState,
    },
  };
};

export default useProfilView;

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { userSelector } from "../slice/selectors";
import { FindAllUserAsync } from "../usecase/findAllUser/findAllUserAsync";

export const useGetMyself = () => {
  const myselfState = useAppSelector(userSelector.mySelfState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FindAllUserAsync())
      .unwrap()
      .then((result) => {
        console.log("result", result);
      })

      .catch((err) => console.log("err", err));
  }, []);

  return {
    state: {
      myself: myselfState.mySelf,
      loading: myselfState.loading,
    },
  };
};

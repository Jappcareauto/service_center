import { AppStartListening } from "@/app/listenerMiddleware";
import { LoginAsync } from "../../usecases/login/LoginAsync";
// import { findAllAppointmentAsync } from "@/modules/appointment/useCase/findAll/findAllAppointmentAsync";
import { findAllAppointmentStatsAsync } from "@/modules/statistics/usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsAsync";
import { calculateRange } from "@/modules/statistics/utils/calculStatsRange";
import { StatsRange } from "@/modules/statistics/models/statsRanche";
import { findSelfAsync } from "@/modules/user/usecase/findSelf/findSelfAsync";

export const authMiddleware = (listener: AppStartListening) => {
  listener({
    actionCreator: LoginAsync.fulfilled,
    effect: async (action, listenerApi) => {
      const range = calculateRange(StatsRange.WEEK);
      await listenerApi.dispatch(findAllAppointmentStatsAsync(range));
      await listenerApi.dispatch(findSelfAsync());
      //   await listenerApi.dispatch(findAllAppointmentAsync()).unwrap();
      console.log("action", action);
    },
  });
};

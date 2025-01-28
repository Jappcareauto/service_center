import { RootState } from "@/app/store";
import { serviceApdapter } from "./serviceSlice";

const serviceCenterState = (state: RootState) =>
  state.services.allServiceCenterState;
const serviceAdapterSelector = serviceApdapter.getSelectors<RootState>(
  (state) => state.services.collections
);

export const serviceCenterSelector = {
  serviceCenterState,
  ...serviceAdapterSelector,
};

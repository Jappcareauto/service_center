import { RootState } from "@/app/store";

 const serviceCenterState = (state: RootState) =>
  state.services.allServiceCenterState;



 export const  serviceCenterSelector = {serviceCenterState}
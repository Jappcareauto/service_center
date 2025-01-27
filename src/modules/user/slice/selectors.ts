import { RootState } from "@/app/store";

const allUserState = (state: RootState) => state.user.allUserState;
const mySelfState = (state: RootState) => state.user.mySelfState;
export const userSelector = { allUserState,  mySelfState };

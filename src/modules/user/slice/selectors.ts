import { RootState } from "@/app/store";
import { userAdapter } from "./userSlice";

const allUserState = (state: RootState) => state.user.allUserState;
const mySelfState = (state: RootState) => state.user.mySelfState;

const userAdapterSelector = userAdapter.getSelectors<RootState>(state=>state.user.collections)




export const userSelector = { allUserState,  mySelfState,...userAdapterSelector };


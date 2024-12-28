import { RootState } from "@/app/store";


const loading = (state: RootState) => state.auth.loading;
const isLogin = (state: RootState) => !!state.auth.auth;




export const AuthSelectors = {
  loading,
  isLogin,
};
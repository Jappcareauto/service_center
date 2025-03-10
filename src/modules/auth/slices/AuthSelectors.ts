import { RootState } from "@/app/store";

const loading = (state: RootState) => state.auth.loading;
const isLogin = (state: RootState) => !!state.auth.auth;
const errorMessage = (state: RootState) => state.auth.errorMessage


export const AuthSelectors = {
  loading,
  isLogin,
  errorMessage
};
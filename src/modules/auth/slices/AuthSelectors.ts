import { RootState } from "@/app/store";

const loading = (state: RootState) => state.auth.loading;
const isLogin = (state: RootState) => !!state.auth.auth;
const errorMessage = (state: RootState) => state.auth.errorMessage
const serviceCenterId = (state: RootState) => state.auth.serviceCenterId


export const AuthSelectors = {
  loading,
  isLogin,
  errorMessage,
  serviceCenterId
};
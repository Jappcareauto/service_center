import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";
import { paths } from "./paths"; // your route paths, e.g., paths.login

const ProtectedRoute = () => {
  const { user_info } = useSelector((state: RootState) => state.auth);

  return user_info ? <Outlet /> : <Navigate to={paths.index} replace />;
};

export default ProtectedRoute;

import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../infra/routes/Router";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const handleSendMail = () => {
    navigate(AuthRoutes.changePassword);
  }
  return {
    handleSendMail,
  };
}
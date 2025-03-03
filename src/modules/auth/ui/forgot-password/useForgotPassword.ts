import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../infra/routes/Router";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const handleSendMail = () => {
    navigate(AuthRoutes.forgotPasswordConfirm);
  }
  return {
    handleSendMail,
  };
}
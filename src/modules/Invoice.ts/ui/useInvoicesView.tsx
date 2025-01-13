import { useNavigate } from "react-router-dom";

export const useInvoicesView = () => {
  const navigate = useNavigate();
  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return {
    handleNavigation,
  };
};

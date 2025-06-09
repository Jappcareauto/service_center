import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, shouldRedirect } = useSelector(
    (state: RootState) => state.auth
  );

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!accessToken && shouldRedirect && !hasRedirected.current) {
      hasRedirected.current = true;
      const redirectTo = location.pathname !== "/" ? location.pathname : "/dashboard";
      navigate(`/?redirect=${redirectTo}`, { replace: true });
    }
  }, [accessToken, shouldRedirect, location.pathname, navigate]);

  return null;
};

export default AuthRedirectHandler;

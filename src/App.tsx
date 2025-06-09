import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Loader from './components/loader/Loader';
import {
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from "./redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import Routing from "./routes/Routing";

const App = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken, user_info } = useAppSelector(
    (state) => state.auth
  );
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-sine", once: true });

    if (accessToken && refreshToken && user_info) {
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setUserInfo(user_info));
    }

    setRehydrated(true);
  }, [accessToken, dispatch, refreshToken, user_info]);

  if (!rehydrated) {
    return <Loader />; // or return a loading spinner
  }

  return (
    <>
      <Routing />
    </>
  );
};

export default App;

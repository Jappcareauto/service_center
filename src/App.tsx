import Routing from "./routes/Routing";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-sine", once: true });
  }, []);

  return <Routing />;
};

export default App;

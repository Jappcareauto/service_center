
import { RouterProvider } from "react-router-dom";
import Navigation from "./routes/Navigation";
import ToastNotifier from "./components/alerts/ToastNotifier";

const App = () => {
  return (
    <>
      <RouterProvider router={Navigation}/>
      <ToastNotifier />
    </>
  )
}

export default App;
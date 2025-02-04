import { RouterProvider } from "react-router-dom";
import "./App.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { createRouter } from "./app/routes/Router";
import { AppStore } from "./app/store";

const App: React.FC<{ store: AppStore }> = ({ store }) => {
  const router = createRouter({ store });
  return (
      <RouterProvider router={router} />
  );
};

export default App;

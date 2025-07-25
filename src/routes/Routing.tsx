import Fallback from "@/components/loader/Fallback.component";
import AuthLayout from "@/layouts/AuthLayout";
import ErrorPage from "@/pages/404/404.page";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthRedirectHandler from "./AuthRedirectHandler";
import ProtectedRoute from "./RouteGuard";
import { routes } from "./routes";

const Routing = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Router>
        <AuthRedirectHandler />
        <Routes>
          {/* Auth routes */}
          {routes
            .filter((route) => !route?.isProtected)
            .map((route, i) => (
              <Route
                key={`auth-${i}`}
                path={route.path}
                element={
                  <AuthLayout>
                    <route.component />
                  </AuthLayout>
                }
              />
            ))}

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            {routes
              .filter((route) => route?.isProtected)
              .map((route, i) => (
                <Route
                  key={`dashboard-${i}`}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routing;

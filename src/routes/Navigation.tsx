import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Login from "../views/authentication/Login";
import ForgotPassword from "../views/authentication/ForgotPassword";
import ForgotPasswordConfirm from "../views/authentication/ForgotPasswordConfirm";

import Dashboard from "@/views/dashboard/Dashboard";


const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<AuthenticationLayout><Login /></AuthenticationLayout>} />
            <Route path="/forgot-password" element={<AuthenticationLayout><ForgotPassword /></AuthenticationLayout>} />
            <Route path="/forgot-password-confirm" element={<AuthenticationLayout><ForgotPasswordConfirm /></AuthenticationLayout>} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
        </Route>
    )
)

export default Navigation;
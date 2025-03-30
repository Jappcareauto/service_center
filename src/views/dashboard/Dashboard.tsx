import React from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setErrorMessage } from "@/redux/messagesSlice";

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate("/login");
            dispatch(setErrorMessage("You must login to access this"))
        }
    }
    , [isAuthenticated, user, navigate]);


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard!</p>
        </div>
    );
};

export default Dashboard;
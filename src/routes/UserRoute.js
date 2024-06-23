// src/components/UserRoute.js
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || role !== "Ordinary User") {
    navigate("/signin");
    return null;
  }

  return <Route {...rest} element={<Component />} />;
};

export default UserRoute;

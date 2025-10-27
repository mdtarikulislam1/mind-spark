import React from "react";
import { Navigate } from "react-router";
import { getToken } from "../Pages/Helper/SessionHelper";

export default function PrivateRoute({ children }) {
  const token = getToken();


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

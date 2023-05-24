import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // check if user has logged in
  const userLogin = useSelector((state) => state?.users?.userAuth);
  return userLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

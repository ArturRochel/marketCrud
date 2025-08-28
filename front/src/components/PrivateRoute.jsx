import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const estaAutenticado = true;
  if (!estaAutenticado) {
    return <Navigate to="/" />;
  }

  return children;
  return <div>PrivateRoute</div>;
};

export default PrivateRoute;

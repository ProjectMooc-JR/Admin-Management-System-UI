import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function NeedAuth(props) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return auth.IsAuth ? (
    props.children
  ) : (
    <Navigate to={"/login"} replace state={{ preLocation: location }} />
  );
}

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const GetOrder = () => {
  const context = useContext(UserContext);
  if (!context.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Get Order</h1>
    </>
  );
};

export default GetOrder;

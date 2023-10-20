import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

//Components

const AddOrder = () => {
  const context = useContext(UserContext);
  if (!context?.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>Add Order</h1>
    </>
  );
};

export default AddOrder;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

//Components

const Logout = () => {
  const context = useContext(UserContext);

  return (
    <>
      <h1>Logout</h1>
    </>
  );
};

export default Logout;

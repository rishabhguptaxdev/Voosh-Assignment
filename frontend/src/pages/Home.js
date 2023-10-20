import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Home = () => {
  const context = useContext(UserContext);

  if (!context?.isLoggedIn) {
    return <Navigate to="/loginuser" />;
  } else {
    return <Navigate to="/getorder" />;
  }
};

export default Home;

import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/cookie";

const Home = () => {
  if (getToken()) {
    console.log(
      "redirecting to get order /getorder route because token is found in the cookie."
    );
    return <Navigate to="/getorder" />;
  } else {
    console.log(
      "redirecting to login screen /loginuser because token is not found in the cookie."
    );
    return <Navigate to="/loginuser" />;
  }
};

export default Home;

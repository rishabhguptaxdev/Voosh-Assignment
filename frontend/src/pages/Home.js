import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  if (localStorage.getItem("isLoggedIn")) {
    console.log(
      "redirecting to get order /addorder route because token is found in the cookie."
    );
    return <Navigate to="/api/v1/addorder" />;
  } else {
    console.log(
      "redirecting to login screen /loginuser because token is not found in the cookie."
    );
    return <Navigate to="/api/v1/loginuser" />;
  }
};

export default Home;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

//Components

const Home = () => {
  const context = useContext(UserContext);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;

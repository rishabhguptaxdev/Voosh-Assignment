import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

//Components

const Logout = () => {
  const handleLogout = async () => {
    try {
      const instance = axios.create({
        withCredentials: true, // This allows cookies to be sent and received
      });
      await instance
        .get(process.env.REACT_APP_API_BASE_URL + "/logout")
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            context.setIsLoggedIn(0);
            context.hideLoader();
          }
        });
    } catch (error) {
      console.log(error);
      context.hideLoader();
    }
  };
  const context = useContext(UserContext);

  handleLogout();

  return (
    <>
      <h1>Logout</h1>
    </>
  );
};

export default Logout;

import React, { useState, useEffect } from "react";
import axios from "axios";

//Routing
import { Routes, Route } from "react-router-dom";

//Bootstrap + Manual Css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components
import NavBar from "./components/NavBar";

//Pages
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AddOrder from "./pages/AddOrder";
import GetOrder from "./pages/GetOrder";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

//Contexts
import UserContext from "./contexts/UserContext";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Created Hooks
import usePageLoader from "./components/UsePageLoader";

import { getCookie } from "./utils/cookie";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [orders, setOrders] = useState([]);
  const [cookie, setCookie] = useState("");
  const [user, setUser] = useState("");
  const [loader, showLoader, hideLoader] = usePageLoader();

  const getOrder = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_API_BASE_URL + "/getorder", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status == 200) {
            hideLoader();
            setIsLoggedIn(1);
            setOrders(response.data.order);
          }
        });
    } catch (error) {
      hideLoader();
    }
  };

  useEffect(() => {
    getOrder();
    // setCookie(getCookie());
    // console.log(cookie);
  }, [isLoggedIn, user]);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider
        value={{
          orders,
          setOrders,
          user,
          setUser,
          isLoggedIn,
          setIsLoggedIn,
          loader,
          showLoader,
          hideLoader,
        }}
      >
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/loginuser" element={<UserLogin />} />
          <Route path="/adduser" element={<UserSignup />} />
          <Route path="/addorder" element={<AddOrder />} />
          <Route path="/getorder" element={<GetOrder />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;

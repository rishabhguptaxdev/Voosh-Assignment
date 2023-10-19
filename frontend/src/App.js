import React, { useState, useEffect } from "react";

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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Created Hooks
import usePageLoader from "./components/UsePageLoader";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [loader, showLoader, hideLoader] = usePageLoader();

  useEffect(() => {}, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider
        value={{
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

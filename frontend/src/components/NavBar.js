import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const NavBar = () => {
  const context = useContext(UserContext);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-home"></i> VOO<span>SH</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {context?.isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/addorder"
                      onClick={() => {}}
                    >
                      Add Order
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/getorder"
                      onClick={() => {}}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={() => {}}>
                      Logout <i className="fas fa-sign-out-alt"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adduser">
                      Sign Up <i className="fas fa-user"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/loginuser">
                      Login <i className="fas fa-user"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

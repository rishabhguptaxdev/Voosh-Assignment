import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { toast } from "react-toastify";

const UserLogin = () => {
  const context = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    context.showLoader();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div
        className="row cover authenticationCard"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-md-4 col-sm-1"></div>
        <div className="col-md-4 mt-4 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">User Login</h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>

              <br />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-1"></div>
      </div>

      {context.loader}
    </>
  );
};

export default UserLogin;

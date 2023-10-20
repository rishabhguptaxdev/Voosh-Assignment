import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";

const UserSignup = () => {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    context.showLoader();
    try {
      const instance = axios.create({
        withCredentials: true, // This allows cookies to be sent and received
      });
      await instance
        .post(
          process.env.REACT_APP_API_BASE_URL + "/adduser",
          {
            name: name,
            phone: phone,
            password: password,
          },
          { withcredentials: true }
        )
        .then((response) => {
          if (response.status == 200) {
            context.setIsLoggedIn(1);
            console.log(response);
            context.hideLoader();
            <Navigate to="/" />;
          }
        });
    } catch (error) {
      console.log(error);
      context.hideLoader();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  if (context?.isLoggedIn) {
    return <Navigate to="/" />;
  }

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
              <h4 className="card-title text-center">User SignUp</h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                  Sign Up
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

export default UserSignup;

import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, setCookie } from "../utils/cookie";

const UserSignup = () => {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (getToken()) {
    return <Navigate to="/getorder" />;
  }

  const handleSignUp = async (e) => {
    context.showLoader();
    try {
      await axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/adduser",
          {
            name: name,
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status == 200) {
            context.hideLoader();
            setCookie(response.data.token, context);
            context.setUserName(response.data.userName);
            console.log("user signed up successfully");
            toast(`Welcome ${response.data.user.name}`, { type: "info" });
          }
        });
    } catch (error) {
      context.hideLoader();
      console.log("something went wrong while doing signup.");
      toast(`Something went wrong.`, { type: "error" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <>
      <div
        className="row cover card"
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

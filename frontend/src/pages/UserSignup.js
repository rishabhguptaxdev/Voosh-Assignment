import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, setCookie } from "../utils/cookie";

const UserSignup = () => {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
            loginBy: "email",
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
            localStorage.setItem("isLoggedIn", 1);
            localStorage.setItem("name", response.data.userName);
            toast(`Welcome ${response.data.user.name}`, { type: "info" });
            navigate("/api/v1/addorder");
          }
        });
    } catch (error) {
      context.hideLoader();
      console.log("something went wrong while doing signup.");
      toast(`Something went wrong.`, { type: "error" });
    }
  };

  if (localStorage.getItem("isLoggedIn")) {
    return <Navigate to="/api/v1/addorder" />;
  }

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
              <button onClick={handleSignUp} className="btn btn-primary">
                Sign Up
              </button>
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

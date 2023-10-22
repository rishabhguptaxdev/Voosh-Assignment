import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, setCookie } from "../utils/cookie";
import { auth, provider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const UserLogin = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        localStorage.setItem("email", user.email);
        localStorage.setItem("loginBy", "google");
        localStorage.setItem("isLoggedIn", 1);
        localStorage.setItem("name", user.displayName);
        context.setIsLoggedIn(true);
        if (user.displayName && user.email) {
          context.showLoader();
          await axios
            .post(
              process.env.REACT_APP_API_BASE_URL + "/adduser",
              {
                name: user.displayName,
                email: user.email,
                password: "login_by_google",
                loginBy: "google",
              },
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              if (response.status === 200) {
                context.hideLoader();
                setCookie(response.data?.token, context);
                context.setUserName(response.data.userName);
                toast(`Welcome ${response.data.user.name}`, { type: "info" });
                navigate("/api/v1/addorder");
              }
            })
            .catch((error) => {
              context.hideLoader();
              console.log("Something went wrong while doing login.");
              toast(`Something went wrong.`, { type: "error" });
            });
        }
      }
    } catch (error) {
      console.error("Google sign-in error: ", error);
    }
  };

  const handleLoginWithEmail = async (e) => {
    context.showLoader();
    try {
      await axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/loginuser",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            context.hideLoader();
            setCookie(response.data?.token, context);
            context.setUserName(response.data.userName);
            console.log("user logged in successfully.");
            localStorage.setItem("loginBy", "email");
            localStorage.setItem("isLoggedIn", 1);
            localStorage.setItem("name", response.data.userName);
            navigate("/api/v1/addorder");
            toast(`Welcome ${response.data.userName}`, { type: "info" });
          } else {
            console.log(
              "did not get 200 response from server, means something is wrong, so try log in."
            );
            toast("Please try to login again.", { type: "warning" });
            navigate("/api/v1/loginuser");
          }
        });
    } catch (error) {
      context.hideLoader();
      toast("something went wrong", { type: "error" });
      console.log("something went wrong while login.");
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
              <h4 className="card-title text-center">User Login</h4>
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
              <button
                onClick={() => {
                  handleLoginWithEmail();
                }}
                className="btn btn-primary"
              >
                Log In
              </button>
              <br />
              <br />
              <button
                onClick={() => {
                  handleSignInWithGoogle();
                }}
              >
                Sign in with Google
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

export default UserLogin;

import Cookies from "js-cookie";

// Method to set data in cookies
export function setCookie(token, context) {
  Cookies.set("token", token, {
    expires: process.env.COOKIE_EXPIRY || 5,
  });
  context.setIsLoggedIn(true);
}

// Method to get data from cookies
export function getToken() {
  const token = Cookies.get("token");
  token && console.log("Token is found.");
  return token;
}

// Method to remove cookie
// Method to get data from cookies
export function removeCookie() {
  const token = Cookies.get("token");
  if (token) {
    Cookies.remove("token");
    console.log("Cookie is removed.");
    return true;
  } else {
    console.log("No cookie found hence can't remove cookie.");
    return false;
  }
}

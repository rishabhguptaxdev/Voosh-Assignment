import Cookies from "js-cookie";

// Method to set data in cookies which will expire in 7 days
export function setCookie(token) {
  Cookies.set("token", token, {
    expires: 1,
  });
}

// Method to get data from cookies
export function getCookie() {
  console.log(Cookies.get("token"));
  return Cookies.get("token");
}

// module.exports = { setCookie, getCookie };
// Set a Cookie
function setCookie(name, token, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + token + "; " + expires + "; path=/";
}

// Apply setCookie
// setCookie("token", token, 1);
module.exports = { setCookie };

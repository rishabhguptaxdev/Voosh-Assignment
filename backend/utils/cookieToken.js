const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  user.password = undefined;
  const userName = user.name;
  res.status(200).json({
    success: true,
    token,
    user,
    userName,
  });
};

module.exports = cookieToken;

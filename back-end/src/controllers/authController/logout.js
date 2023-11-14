const logout = (req, res) => {
  // Removing the cookie on client side
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}

module.exports = { logout }

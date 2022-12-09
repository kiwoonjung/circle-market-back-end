module.exports = {
  secret: "circle-market-secret-key",
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  // jwtExpiration: 60,
  // jwtRefreshExpiration: 120,
};

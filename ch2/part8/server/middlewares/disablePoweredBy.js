function disablePoweredBy(request, response, next) {
  response.removeHeader("X-Powered-By");

  next();
};

module.exports = { disablePoweredBy };
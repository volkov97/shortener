function urlLogger(request, response, next) {
  console.log(request.originalUrl);

  next();
}

module.exports = { urlLogger };

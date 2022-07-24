async function errorHandler(error, request, response, next) {
  console.log(error);

  response.status(error.status || 500).send({
    status: "error",
    message: error.message,
  });
}

module.exports = { errorHandler };

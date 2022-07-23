async function notFound(request, response) {
  response.status(404);

  return response.send("Not found");
}

module.exports = { notFound };

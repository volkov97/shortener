async function notFound(request, response) {
  response.status(404);

  return response.send({ messageId: "page-not-found" });
}

module.exports = { notFound };

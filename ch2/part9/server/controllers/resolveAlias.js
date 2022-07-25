const { NotFoundError } = require("../modules/error");
const { wsClients } = require("../modules/wsClients");
const linksService = require("../services/links");

async function resolveAlias(request, response, next) {
  try {
    const { alias } = request.params;

    if (alias.length === 0 || /^[a-zA-Z0-9]+$/.test(alias) === false) {
      return next();
    }

    const longLink = await linksService.getByAlias(alias);

    if (!longLink) {
      throw new NotFoundError(`Alias "${alias}" was not found...`);
    }

    wsClients.forEach((wsClient) => {
      if (wsClient.readyState === 1) {
        wsClient.send(alias);
      }
    });

    if (process.env.NODE_ENV === "production") {
      response.redirect(302, longLink);
    } else {
      response.send(longLink);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { resolveAlias };

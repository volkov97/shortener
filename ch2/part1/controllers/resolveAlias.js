const { getByAlias } = require("../services/links");

async function resolveAlias(request, response, next) {
    const { alias } = request.params;

    const longLink = await getByAlias(alias);

    if (!longLink) {
        return next();
    }

    if (process.env.NODE_ENV === 'production') {
        response.redirect(302, longLink);
    } else {
        response.send(longLink);
    }
}

module.exports = { resolveAlias };
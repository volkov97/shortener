const { getLinkByIndex } = require("../services/links");

async function redirectLink(request, response, next) {
    console.log(request.originalUrl);

    const requestedIndex = parseInt(request.url.slice(1));

    const longLink = await getLinkByIndex(requestedIndex);

    if (!longLink) {
        return next();
    }

    return response.redirect(302, longLink);
}

module.exports = { redirectLink };
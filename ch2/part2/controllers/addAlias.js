const linksService = require("../services/links");

async function addAlias(request, response) {
    const { alias, link } = request.body;

    await linksService.addAlias(alias, link);

    return response.send({ status: 'success' });
}

module.exports = { addAlias };
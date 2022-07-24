function ping(request, response) {
    return response.send('pong');
}

module.exports = { ping };
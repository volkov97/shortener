class BaseError extends Error {
    constructor(status, message) {
        super(message);

        this.status = status;
    }
}

class BadRequestError extends BaseError {
    constructor(message) {
        super(400, message);
    }
}

class NotFoundError extends BaseError {
    constructor(message) {
        super(404, message);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError
};
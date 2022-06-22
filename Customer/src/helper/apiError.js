// import error from './error';


const error = require('./error');

class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message ? message : error[code] || 'internal server error';
        this.isApiError = true;
        console.log(this.message);
    }

    static unauthorized(msg) {
        return new ApiError(401, msg);
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static internal(msg) {
        return new ApiError(500, msg);
    }
    static notFound(msg) {
        return new ApiError(404, msg);
    }
    static userBlocked(msg) {
        return new ApiError(503, msg);
    }
}

module.exports = ApiError;
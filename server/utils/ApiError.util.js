class ApiError extends Error {

    constructor(statusCode = 500, error = true, message, success = false) {
        super();
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        this.success = success;



    }
}

export default ApiError
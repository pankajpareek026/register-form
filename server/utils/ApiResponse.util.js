class ApiResponse {
    constructor(success = true, message, data, redirect = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.redirect = redirect;
    }
}


export default ApiResponse;
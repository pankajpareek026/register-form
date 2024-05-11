import appConfig from "../src/config/appConfig.js"
import ApiError from "../utils/ApiError.util.js"

const errorHandler = (error, req, res, next) => {
    console.log("next error =>", error)
    if (error instanceof Error) {
        return res.status(500).json({
            error: true,
            message: appConfig.isDevMode ? error.message : "Internal Server Error",
        })

    }
    else {
        res.status(error?.statusCode).json({
            isSuccess: false,
            isError: true,
            message: error.message ? error.message : "internal server error"
        })
    }
}

export default errorHandler;
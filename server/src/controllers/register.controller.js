import Joi from 'joi';
import ApiError from './../../utils/ApiError.util.js';
import userModel from './../../models/user.model.js';
import ApiResponse from './../../utils/ApiResponse.util.js';



const registerUser = async (req, res, next) => {
    try {

        // data validation

        const schema = Joi.object({

            firstName: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .label('First Name')
                .required()
                .messages({
                    'string.base': `First Name must be a string`,
                    'string.empty': `First Name is required`,
                    'string.pattern.base': `First Name must contain only letters`,
                    'any.required': `First Name is required`
                }),
            lastName: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .label('First Name')
                .required()
                .messages({
                    'string.base': `Last Name must be a string`,
                    'string.empty': `Last Name is required`,
                    'string.pattern.base': `Last Name must contain only letters`,
                    'any.required': `Last Name is required`
                }),
            email: Joi.string()
                .email({ tlds: { allow: false } })
                .required()
                .messages({
                    'string.base': `Invalid email address`,
                    'string.email': `Invalid email address`,
                    'string.empty': `Email is required`,
                    'any.required': `Email is required`
                }),
            country: Joi.string()
                .required()
                .messages({
                    'string.base': `Invalid country name`,
                    'string.empty': `Country is required`,
                    'string.pattern.base': `Country must contain only letters`,
                    'any.required': `Country is required`
                }),
            state: Joi.string()
                .required()
                .messages({
                    'string.base': `Invalid state name`,
                    'string.empty': `State is required`,
                    'string.pattern.base': `State must contain only letters`,
                    'any.required': `State is required`
                }),
            city: Joi.string()
                .required()
                .messages({
                    'string.base': `Invalid city name`,
                    'string.empty': `City is required`,
                    'string.pattern.base': `City must contain only letters`,
                    'any.required': `City is required`
                }),
            gender: Joi.string()
                .valid('Male', 'Female')
                .required()
                .messages({
                    'any.only': `Gender must be either 'Male' or 'Female'`,
                    'any.required': `Gender is required`
                }),
            dob: Joi.date()
                .required()
                .messages({
                    'date.base': `Invalid date of birth`,
                    'any.required': `Date of birth is required`
                }),
            age: Joi.number()
                .integer()
                .min(14)
                .max(99)
                .required()
                .messages({
                    'number.base': `Age must be a number`,
                    'number.integer': `Age must be an integer`,
                    'number.min': `Age must be at least 14`,
                    'number.max': `Age must not exceed 99`,
                    'any.required': `Age is required`
                })
        });


        const { error, value } = schema.validate(req.body)
        console.log("values =>", value)
        if (error) {
            console.error("validation error: ", error.message)
            // if validation fails the send error message
            return next(new ApiError(400, true, error.message))
        }
        // save user info in db
        const result = await userModel.create(value)

        // if any error while seving data
        if (!result._id) {
            return next(new ApiError(true, error.message))
        }
        console.log("result", result)
        // send success message 
        res.json(new ApiResponse(true, "Registration successfull", null, `/user/${result._id}`))





    } catch (error) {
        console.error(error);
        next(new Error(error.message));
    }
}


// to get all data for a user by userid
const getUserInfo = async (req, res, next) => {
    try {
        const { id: userId } = req.params

        // find user info in respose to user id
        const result = await userModel.findOne({ _id: userId }, { __v:0 })
        if (!result.id) {
            return next(new ApiError(404, "User not found"));
        }

        // formate data

        res.status(200).json(new ApiResponse(true, "success", result))
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export {
    registerUser,
    getUserInfo
}
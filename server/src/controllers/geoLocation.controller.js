// to get all cites from db
import Joi from 'joi';
import geoModel from './../../models/geo.model.js';
import ApiError from './../../utils/ApiError.util.js';
import ApiResponse from './../../utils/ApiResponse.util.js';


// to get all countries
const getCountries = async (req, res, next) => {
    try {
        const result = await geoModel.find({}, { name: 1, id: 1, _id: 0 })

        // console.log("result=>", result);
        if (result.length <= 0) {
            return next(new ApiError(500, true, "somethin went wrong"));
        }

        res.status(200).json(new ApiResponse(true, "success", result));
    } catch (error) {
        console.error(error);
        next(error)
    }
}

// to get all states associated with a given country
const getStates = async (req, res, next) => {
    try {
        const { countryId } = req.params;
        console.log("params=>", req.params)
        // if counrty code is not available in params 
        const schema = Joi.object({
            countryId: Joi.string().required().messages({
                'number.base': `Invalid country Code`,
                'number.integer': `Country Code must be an integer`,
                'number.min': `Country Code be at least 1`,
                'number.max': `Country Code not exceed 250`,
                'any.required': `Country Code is required`
            }),
        })

        const { error, value } = schema.validate(req.params)
        console.error(error)
        // if validation faild
        if (error) {
            console.log("Validation Error=>", error)
            return next(new ApiError(400, true, error.message))
        }

        // get all states associated with country id
        const states = await geoModel.aggregate(
            [
                {
                    $match: {
                        id: parseInt(countryId),
                    }
                },
                {
                    $unwind: "$states"
                },
                {
                    $project: {
                        countryCode: "$id",
                        countryName: "$name",
                        _id: 0,
                        id: "$states.id",
                        name: "$states.name"
                    }
                }
            ])
        console.log("states =>", states.length)
        // if states not found 

        const customStates = states.length > 0 ? states : [{ noState: true }]
        // console.log('states=>', states)
        res.status(200).json(new ApiResponse(true, 'success', customStates))
    }

    catch (error) {
        console.error("ERROR", error);
        next(error)
    }
}

// get all cities associated with a given state
const getCities = async (req, res, next) => {
    try {


        const { countryId, stateId } = req.params
        console.log("params=>", req.params)
        const schema = Joi.object({
            countryId: Joi.number().min(1).max(250).required().messages({
                'number.base': `Invalid country Code`,
                'number.integer': `Country Code must be an integer`,
                'number.min': `Country Code be at least 1`,
                'number.max': `Country Code not exceed 250`,
                'any.required': `Country Code is required`
            }),
            stateId: Joi.number().required().messages({
                'number.base': `Invalid State Code`,
                'number.integer': `State Code must be an integer`,
                'any.required': `State Code is required`
            })
        })
        const { error, value } = schema.validate(req.params);

        console.log("Validation Error=>", error)
        // if validation fails
        if (error) {
            return next(new ApiError(404, true, error.message));
        }


        // find out all countries inside a this.state
        const cities = await geoModel.aggregate([
            {
                // find by country id
                "$match": {
                    "id": parseInt(countryId)
                }
            },
            {
                // open state array
                "$unwind": "$states"
            },
            {
                // select only state with given stateId
                "$match": {
                    "states.id": parseInt(stateId)
                }
            },
            {
                // open cites array
                "$unwind": "$states.cities"
            },
            {
                // project only required fields
                $project: {
                    _id: 0,
                    coutryCode: "$id",
                    stateId: "$states.id",
                    name: "$states.cities.name",
                    id: "$states.cities.id",
                }
            }
        ]
        )

        console.log("Cities=>", cities.length)
        const customCity = cities.length > 0 ? cities : [{ noCity: true }]
        // cities not found in respect to countryId and stateId

        res.status(200).json(new ApiResponse(true, 'success', customCity))

    } catch (error) {
        console.error(error);
        next(error)
    }
}



export {
    getCountries,
    getStates,
    getCities
}
import mongoose from "mongoose";
import appConfig from "./appConfig.js";
import DB_NAME from './../../constant.js';

const connectDb = async () => {
    try {
        mongoose.connect(`${appConfig.dbUrl}/${DB_NAME}`)
        console.log('Db connection established ✅✅')
    } catch (error) {
        console.error('Error while connecting DB ⚠️')
    }
}

export default connectDb;
import express from 'express'
import cors from 'cors'
import { routes } from './src/routes/route.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import connectDb from './src/config/dbConfig.js';
import appConfig from './src/config/appConfig.js';
const app = express()


// connect db
connectDb()


// register middlewares
app.use(express.json())

app.use(cors(
    {
        origin: appConfig.cors_url
    }
))


// register routes
app.use(routes)



// error handler middlware
app.use(errorHandler)


export default app;
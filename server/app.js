import express from 'express'
import { routes } from './src/routes/route.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import connectDb from './src/config/dbConfig.js';
const app = express()

// connect db
connectDb()


// register middlewares
app.use(express.json())

// register routes
app.use(routes)



// error handler middlware
app.use(errorHandler)


export default app;
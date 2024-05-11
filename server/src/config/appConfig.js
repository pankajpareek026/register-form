import { config as envConfig } from "dotenv"
envConfig()


const _config = {
    dbUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    isDevMode: process.env.DEV_MODE
}

const appConfig = Object.freeze(_config)


export default appConfig


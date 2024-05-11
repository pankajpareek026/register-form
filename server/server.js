import app from "./app.js";
import appConfig from "./src/config/appConfig.js";


app.listen(appConfig.port, (error) => {
    if (error) throw error;
    console.log(`server is running at => http://localhost:${appConfig.port}`);
})
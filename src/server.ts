require('dotenv').config();
import App from "./config/app";
import validateEnvironment from "./config/envValidation";

validateEnvironment();

App.listen();
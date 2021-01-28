require('dotenv').config();
import "reflect-metadata";
import App from "./config/app";
import { validateEnvironment } from "./config/envValidation";

validateEnvironment();

App.listen();

export default App.app;
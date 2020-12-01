import { cleanEnv, num, str } from 'envalid';

export default function validateEnvironment() {
    cleanEnv(process.env, {
        MONGO_DB_NAME: str(),

        MONGO_USERNAME: str(),
        MONGO_PASSWORD: str(),

        PORT: num(),

        JWT_EXPIRATION_TIME: str(),
        SECRET: str(),

        AUTH0_CLIENT_ID: str(),
        AUTH0_DOMAIN: str(),
        AUTH0_CLIENT_SECRET: str(),
        AUTH0_AUDIENCE: str()
    });
}
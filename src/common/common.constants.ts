
import * as dotenv from 'dotenv'
dotenv.config({path: __dirname + '/.env.dev'})

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export const jwtConstants = {
    secret: "" +process.env.JWT_SECRET_KEY,
    header: "" +process.env.JWT_HEADER,
};

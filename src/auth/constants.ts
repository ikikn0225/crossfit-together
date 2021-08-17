import { config } from 'dotenv';
config();

export const jwtConstants = {
    secret: ""+process.env.JWT_SECRET_KEY,
    header: process.env.JWT_HEADER,
};
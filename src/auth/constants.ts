import { config } from 'dotenv';
config();

export const jwtConstants = {
    secret: "TestSecretKey",
    header: "ct-token",
};
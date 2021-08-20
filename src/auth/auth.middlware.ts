import { MiddlewareFn } from "type-graphql"
import { ContextToken } from "./context";
import { verifyAccessToken } from "./jwt";

export const isAuth: MiddlewareFn<ContextToken> = ({ context }, next) => {
    console.log("authorization: "+context);
    const { authorization } = context.req.headers;
    
    if (!authorization) {
        throw new Error('not authenticated');
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = verifyAccessToken(token);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error('not authenticated');
    }
    return next();
};
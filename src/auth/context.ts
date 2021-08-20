import { Request, Response } from 'express';

export interface ContextToken {
    req: Request;
    res: Response;
    payload?: { userId: number };
}
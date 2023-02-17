import { Request, Response } from "express";
export declare const handleRefreshToken: ({ req, res, refreshTokenSecret, accessTokenMaxAge, refreshTokenMaxAge, }: {
    req: Request;
    res: Response;
    refreshTokenSecret: string;
    accessTokenMaxAge: number;
    refreshTokenMaxAge: number;
}) => Promise<unknown>;

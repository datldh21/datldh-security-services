import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { handleRefreshToken } from "./handleRefreshToken";
import { getAccessToken, jwtDecodeToken } from "./util";
import { Config } from "./util/config";

const { TokenExpiredError } = jwt;

export const verifyTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
    REFRESH_TOKEN_SECRET: string,
    ACCESS_TOKEN_MAXAGE?: number,
    REFRESH_TOKEN_MAXAGE?: number
) => {
    const verifyAccessToken = ({
        token,
        jwtSecret,
    }: {
        token: string;
        jwtSecret: string;
    }) => {
        let userObj: any = jwtDecodeToken(token, jwtSecret);
        let verify: any = jwt.verify(token, jwtSecret);
        if (_.isEqual(userObj, verify)) {
            return true;
        } else {
            return false;
        }
    };

    const cookie: any = req.headers.cookie;
    let accessToken: any;
    if (cookie.includes("AccessToken")) {
        try {
            accessToken = getAccessToken(cookie);
            if (!accessToken) {
                res.status(200).send({ message: "Invalid token" });
            }
            if (verifyAccessToken(accessToken)) {
                return next();
            } else {
                res.status(401).send({ message: "Invalid signature" });
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                console.log(req.headers);
            } else {
                res.status(401).send({ message: "Invalid token" });
            }
        }
    } else {
        if (cookie.includes("RefreshToken")) {
            let check = await handleRefreshToken({
                req: req,
                res: res,
                refreshTokenSecret: REFRESH_TOKEN_SECRET,
                accessTokenMaxAge:
                    ACCESS_TOKEN_MAXAGE ?? Config.ACCESS_TOKEN_MAXAGE,
                refreshTokenMaxAge:
                    REFRESH_TOKEN_MAXAGE ?? Config.REFRESH_TOKEN_MAXAGE,
            });
            if (check) {
                next();
            } else {
                res.status(200).send({ refreshLogin: true });
            }
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    }
    return null;
};

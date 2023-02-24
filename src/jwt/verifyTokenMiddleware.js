const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { handleRefreshToken } = require("./handleRefreshToken");
const { getAccessToken, jwtDecodeToken } = require("../../util");
const { TokenExpiredError } = jwt;

const verifyTokenMiddleware = async ({
    req,
    res,
    next,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_MAXAGE,
    REFRESH_TOKEN_MAXAGE,
}) => {
    const verifyAccessToken = ({ token, jwtSecret }) => {
        let userObj = jwtDecodeToken(token, jwtSecret);
        let verify = jwt.verify(token, jwtSecret);
        if (_.isEqual(userObj, verify)) {
            return true;
        } else {
            return false;
        }
    };

    const accessTokenMaxAge = 1000 * 60 * 60 * 24 * 15;
    const refreshTokenMaxAge = 1000 * 60 * 60 * 24 * 90;

    const cookie = req.headers.cookie;
    let accessToken;
    if (cookie.includes("AccessToken")) {
        try {
            accessToken = getAccessToken(cookie);
            if (!accessToken) {
                res.status(200).send({ message: "Invalid token" });
            }
            if (
                verifyAccessToken({
                    token: accessToken,
                    jwtSecret: ACCESS_TOKEN_SECRET,
                })
            ) {
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
                accessTokenSecret: ACCESS_TOKEN_SECRET,
                refreshTokenSecret: REFRESH_TOKEN_SECRET,
                accessTokenMaxAge: ACCESS_TOKEN_MAXAGE ?? accessTokenMaxAge,
                refreshTokenMaxAge: REFRESH_TOKEN_MAXAGE ?? refreshTokenMaxAge,
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

module.exports = { verifyTokenMiddleware };

const jwt = require("jsonwebtoken");
const { getAccessToken, getRefreshToken, jwtEncode } = require("../../util");

const handleRefreshToken = async ({
    req,
    res,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_MAXAGE,
    REFRESH_TOKEN_MAXAGE,
}) => {
    return new Promise((resolve, reject) => {
        const cookies = req.headers.cookie;
        let checkRefreshToken = false;
        if (getRefreshToken(cookies) === null) {
            checkRefreshToken = false;
            res.status(401).send("Unauthorized");
        } else {
            const refreshToken = getRefreshToken(cookies);
            const accessToken = getAccessToken(cookies);

            if (!accessToken) {
                // evaluate jwt
                jwt.verify(
                    refreshToken,
                    REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) {
                            checkRefreshToken = false;
                        } else {
                            // Refresh token was still valid
                            const newAccessToken = jwtEncode({
                                id: decoded.id,
                                jwtSecret: ACCESS_TOKEN_SECRET,
                                tokenExpired: ACCESS_TOKEN_MAXAGE,
                            });
                            const newRefreshToken = jwtEncode({
                                id: decoded.id,
                                jwtSecret: REFRESH_TOKEN_SECRET,
                                tokenExpired: REFRESH_TOKEN_MAXAGE,
                            });
                            // Creates Secure Cookie with refresh token
                            res.cookie("AccessToken", newAccessToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "lax",
                                maxAge: ACCESS_TOKEN_MAXAGE,
                            });
                            res.cookie("RefreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                                maxAge: REFRESH_TOKEN_MAXAGE,
                            });
                            checkRefreshToken = true;
                        }
                    }
                );
            }
        }
        resolve(checkRefreshToken);
    });
};

module.exports = { handleRefreshToken };

const { jwtEncode } = require("../util");

const generateToken = ({ id, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET }) => {
    const accessTokenMaxAge = 1000 * 60 * 60 * 24 * 15;
    const refreshTokenMaxAge = 1000 * 60 * 60 * 24 * 90;

    const accessToken = jwtEncode({
        id,
        jwtSecret: ACCESS_TOKEN_SECRET,
        tokenExpired: accessTokenMaxAge,
    });
    const refreshToken = jwtEncode({
        id,
        jwtSecret: REFRESH_TOKEN_SECRET,
        tokenExpired: refreshTokenMaxAge,
    });

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};

module.exports = { generateToken };

const jwt = require("jsonwebtoken");

const getAccessToken = (cookie) => {
    let accessToken;
    let arr = cookie.match(/AccessToken=\S+/gm);
    if (arr?.length > 0) {
        accessToken = arr[0].replace(/AccessToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    } else {
        return null;
    }
};

const getRefreshToken = (cookie) => {
    let accessToken;
    let arr = cookie.match(/RefreshToken=\S+/gm);
    if (arr?.length > 0) {
        accessToken = arr[0].replace(/RefreshToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    } else {
        return null;
    }
};

const jwtEncode = function ({ id, jwtSecret, tokenExpired }) {
    return jwt.sign({ id: id }, jwtSecret, {
        expiresIn: tokenExpired,
    });
};

const jwtDecodeToken = function (token, jwtSecret) {
    try {
        let decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = { getAccessToken, getRefreshToken, jwtEncode, jwtDecodeToken };

import jwt from "jsonwebtoken";
export var refreshTokenEncode = function (_a) {
    var id = _a.id, refreshTokenSecret = _a.refreshTokenSecret, refreshTokenExpired = _a.refreshTokenExpired;
    return jwt.sign({ id: id }, refreshTokenSecret, {
        expiresIn: refreshTokenExpired,
    });
};
export var getAccessToken = function (cookie) {
    var accessToken;
    var arr = cookie.match(/AccessToken=\S+/gm);
    if ((arr === null || arr === void 0 ? void 0 : arr.length) > 0) {
        accessToken = arr[0].replace(/AccessToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    }
    else {
        return null;
    }
};
export var getRefreshToken = function (cookie) {
    var accessToken;
    var arr = cookie.match(/RefreshToken=\S+/gm);
    if ((arr === null || arr === void 0 ? void 0 : arr.length) > 0) {
        accessToken = arr[0].replace(/RefreshToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    }
    else {
        return null;
    }
};
export var jwtEncode = function (_a) {
    var id = _a.id, jwtSecret = _a.jwtSecret, tokenExpired = _a.tokenExpired;
    return jwt.sign({ id: id }, jwtSecret, {
        expiresIn: tokenExpired,
    });
};
export var jwtDecodeToken = function (token, jwtSecret) {
    try {
        var decoded = jwt.verify(token, jwtSecret);
        return decoded;
    }
    catch (err) {
        return null;
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecodeToken = exports.jwtEncode = exports.getRefreshToken = exports.getAccessToken = exports.refreshTokenEncode = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var refreshTokenEncode = function (_a) {
    var id = _a.id, refreshTokenSecret = _a.refreshTokenSecret, refreshTokenExpired = _a.refreshTokenExpired;
    return jsonwebtoken_1.default.sign({ id: id }, refreshTokenSecret, {
        expiresIn: refreshTokenExpired,
    });
};
exports.refreshTokenEncode = refreshTokenEncode;
var getAccessToken = function (cookie) {
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
exports.getAccessToken = getAccessToken;
var getRefreshToken = function (cookie) {
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
exports.getRefreshToken = getRefreshToken;
var jwtEncode = function (_a) {
    var id = _a.id, jwtSecret = _a.jwtSecret, tokenExpired = _a.tokenExpired;
    return jsonwebtoken_1.default.sign({ id: id }, jwtSecret, {
        expiresIn: tokenExpired,
    });
};
exports.jwtEncode = jwtEncode;
var jwtDecodeToken = function (token, jwtSecret) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        return decoded;
    }
    catch (err) {
        return null;
    }
};
exports.jwtDecodeToken = jwtDecodeToken;

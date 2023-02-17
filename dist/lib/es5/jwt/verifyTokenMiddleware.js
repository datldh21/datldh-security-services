"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var lodash_1 = require("lodash");
var handleRefreshToken_1 = require("./handleRefreshToken");
var util_1 = require("../util");
var config_1 = require("../util/config");
var TokenExpiredError = jsonwebtoken_1.default.TokenExpiredError;
var verifyTokenMiddleware = function (req, res, next, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_MAXAGE, REFRESH_TOKEN_MAXAGE) { return __awaiter(void 0, void 0, void 0, function () {
    var verifyAccessToken, cookie, accessToken, check;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                verifyAccessToken = function (_a) {
                    var token = _a.token, jwtSecret = _a.jwtSecret;
                    var userObj = (0, util_1.jwtDecodeToken)(token, jwtSecret);
                    var verify = jsonwebtoken_1.default.verify(token, jwtSecret);
                    if (lodash_1.default.isEqual(userObj, verify)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                cookie = req.headers.cookie;
                if (!cookie.includes("AccessToken")) return [3 /*break*/, 1];
                try {
                    accessToken = (0, util_1.getAccessToken)(cookie);
                    if (!accessToken) {
                        res.status(200).send({ message: "Invalid token" });
                    }
                    if (verifyAccessToken(accessToken)) {
                        return [2 /*return*/, next()];
                    }
                    else {
                        res.status(401).send({ message: "Invalid signature" });
                    }
                }
                catch (error) {
                    if (error instanceof TokenExpiredError) {
                        console.log(req.headers);
                    }
                    else {
                        res.status(401).send({ message: "Invalid token" });
                    }
                }
                return [3 /*break*/, 4];
            case 1:
                if (!cookie.includes("RefreshToken")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, handleRefreshToken_1.handleRefreshToken)({
                        req: req,
                        res: res,
                        refreshTokenSecret: REFRESH_TOKEN_SECRET,
                        accessTokenMaxAge: ACCESS_TOKEN_MAXAGE !== null && ACCESS_TOKEN_MAXAGE !== void 0 ? ACCESS_TOKEN_MAXAGE : config_1.Config.ACCESS_TOKEN_MAXAGE,
                        refreshTokenMaxAge: REFRESH_TOKEN_MAXAGE !== null && REFRESH_TOKEN_MAXAGE !== void 0 ? REFRESH_TOKEN_MAXAGE : config_1.Config.REFRESH_TOKEN_MAXAGE,
                    })];
            case 2:
                check = _a.sent();
                if (check) {
                    next();
                }
                else {
                    res.status(200).send({ refreshLogin: true });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(401).send({ message: "Invalid token" });
                _a.label = 4;
            case 4: return [2 /*return*/, null];
        }
    });
}); };
exports.verifyTokenMiddleware = verifyTokenMiddleware;

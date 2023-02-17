"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.ACCESS_TOKEN_MAXAGE = 1000 * 60 * 60 * 24 * 15;
    Config.REFRESH_TOKEN_MAXAGE = 1000 * 60 * 60 * 24 * 90;
    return Config;
}());
exports.Config = Config;

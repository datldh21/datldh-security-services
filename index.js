const { EncryptFieldsData } = require("./src/cryptData/encryptFieldsData");
const { DecryptFieldsData } = require("./src/cryptData/decryptFieldsData");
const { addWatermarkToImage } = require("./src/watermark/addWatermarkToImage");
const { hashStringData } = require("./src/cryptData/hashString");
const { antiXSS } = require("./src/xss/antiXSS");
const { antiNoSQL } = require("./src/sqlInjection/antiNoSQL");
const { antiSQL } = require("./src/sqlInjection/antiSQL");
const { limitLoginAttempts } = require("./src/bruteForce/limitLoginAttempts");
const { isStrongPassword } = require("./src/bruteForce/isStrongPassword");
const { generateToken } = require("./src/jwt/generateToken");
const { verifyTokenMiddleware } = require("./src/jwt/verifyTokenMiddleware");

module.exports = {
    EncryptFieldsData,
    DecryptFieldsData,
    addWatermarkToImage,
    hashStringData,
    antiXSS,
    antiNoSQL,
    antiSQL,
    limitLoginAttempts,
    isStrongPassword,
    generateToken,
    verifyTokenMiddleware,
};

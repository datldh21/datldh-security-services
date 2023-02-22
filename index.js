const { EncryptFieldsData } = require("./src/cryptData/encryptFieldsData");
const { DecryptFieldsData } = require("./src/cryptData/decryptFieldsData");
const { addWatermarkToImage } = require("./src/watermark/addWatermarkToImage");
const { hashStringData } = require("./src/cryptData/hashString");
const { antiXSS } = require("./src/xss/antiXSS");
const { antiNoSQL } = require("./src/sqlInjection/antiNoSQL");
const { antiSQL } = require("./src/sqlInjection/antiSQL");
const { antiBruteForce } = require("./src/bruteForce/antiBruteForce");
const { generateToken } = require("./src/jwt/generateToken");
const { handleRefreshToken } = require("./src/jwt/handleRefreshToken");
const { verifyTokenMiddleware } = require("./src/jwt/verifyTokenMiddleware");

module.exports = {
    EncryptFieldsData,
    DecryptFieldsData,
    addWatermarkToImage,
    hashStringData,
    antiXSS,
    antiNoSQL,
    antiSQL,
    antiBruteForce,
    generateToken,
    handleRefreshToken,
    verifyTokenMiddleware,
};

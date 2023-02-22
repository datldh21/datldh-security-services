const CryptoJS = require("crypto-js");

const hashStringData = ({ data }) => {
    return CryptoJS.SHA256(data);
};

module.exports = { hashStringData };

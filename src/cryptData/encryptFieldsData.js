const CryptoJS = require("crypto-js");

const EncryptFieldsData = ({ listData, fields, secretKey }) => {
    if (listData?.length === 0) {
        return [];
    } else {
        if (fields.length === 0) {
            return listData;
        } else {
            let result = [];
            listData.map((data) => {
                let newData = { ...data };
                fields.map((field) => {
                    let encryptField = CryptoJS.AES.encrypt(
                        JSON.stringify({ field: data[field] }),
                        secretKey
                    ).toString();
                    newData = {
                        ...newData,
                        [field]: encryptField,
                    };
                });
                result.push(newData);
            });
            return result;
        }
    }
};

module.exports = { EncryptFieldsData };

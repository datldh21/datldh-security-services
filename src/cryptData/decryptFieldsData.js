const CryptoJS = require("crypto-js");

const DecryptFieldsData = ({ listData, fields, secretKey }) => {
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
                    let decryptField = JSON.parse(
                        CryptoJS.AES.decrypt(
                            data[field].toString(),
                            secretKey
                        ).toString(CryptoJS.enc.Utf8)
                    );
                    newData = {
                        ...newData,
                        [field]: decryptField.field,
                    };
                });
                result.push(newData);
            });
            return result;
        }
    }
};

module.exports = { DecryptFieldsData };

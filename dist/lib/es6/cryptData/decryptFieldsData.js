var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import CryptoJS from "crypto-js";
export var DecryptFieldsData = function (_a) {
    var listData = _a.listData, fields = _a.fields, secretKey = _a.secretKey;
    if ((listData === null || listData === void 0 ? void 0 : listData.length) === 0) {
        return [];
    }
    else {
        if (fields.length === 0) {
            return listData;
        }
        else {
            var result_1 = [];
            listData.map(function (data) {
                var newData = __assign({}, data);
                fields.map(function (field) {
                    var _a;
                    var decryptField = JSON.parse(CryptoJS.AES.decrypt(data[field].toString(), secretKey).toString(CryptoJS.enc.Utf8));
                    newData = __assign(__assign({}, newData), (_a = {}, _a[field] = decryptField.field, _a));
                });
                result_1.push(newData);
            });
            return result_1;
        }
    }
};

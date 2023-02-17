import CryptoJS from "crypto-js";

export const DecryptFieldsData = ({
    listData,
    fields,
    secretKey,
}: {
    listData: any[];
    fields: any;
    secretKey: any;
}) => {
    if (listData?.length === 0) {
        return [];
    } else {
        if (fields.length === 0) {
            return listData;
        } else {
            let result: any[] = [];
            listData.map((data: any) => {
                let newData = { ...data };
                fields.map((field: any) => {
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

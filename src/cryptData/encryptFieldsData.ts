import CryptoJS from "crypto-js";

export const EncryptFieldsData = ({
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

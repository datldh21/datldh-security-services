export function EncryptFieldsData({
    listData,
    fields,
    secretKey,
}: {
    listData: any[];
    fields: string[];
    secretKey: string;
});

export function DecryptFieldsData({
    listData,
    fields,
    secretKey,
}: {
    listData: any[];
    fields: string[];
    secretKey: string;
});

export function addWatermarkToImage({
    mainImage,
    watermarkUrl,
    ratio,
    opacity,
}: {
    mainImage: Buffer | string;
    watermarkUrl: string;
    ratio: number | undefined;
    opacity: number | undefined;
});

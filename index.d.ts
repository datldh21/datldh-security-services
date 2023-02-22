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

export function hashStringData({ data }: { data: string });

export function antiXSS({ input }: { input: string });

export function antiNoSQL({ input }: { input: any });

export function antiSQL({ input }: { input: any });

export function antiBruteForce({
    password,
    attempts,
    lockoutTime,
}: {
    password: string;
    attempts: number;
    lockoutTime: number;
});

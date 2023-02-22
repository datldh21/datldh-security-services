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

export function generateToken({
    id,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
}: {
    id: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
});

export function handleRefreshToken({
    req,
    res,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_MAXAGE,
    REFRESH_TOKEN_MAXAGE,
}: {
    req: Request;
    res: Response;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_MAXAGE: number;
    REFRESH_TOKEN_MAXAGE: number;
});

export function verifyTokenMiddleware({
    req,
    res,
    next,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_MAXAGE,
    REFRESH_TOKEN_MAXAGE,
}: {
    req: Request;
    res: Response;
    next: Function;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_MAXAGE: number | undefined;
    REFRESH_TOKEN_MAXAGE: number | undefined;
});

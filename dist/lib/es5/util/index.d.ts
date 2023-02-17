export declare const refreshTokenEncode: ({ id, refreshTokenSecret, refreshTokenExpired, }: {
    id: string;
    refreshTokenSecret: string;
    refreshTokenExpired: any;
}) => any;
export declare const getAccessToken: (cookie: any) => any;
export declare const getRefreshToken: (cookie: any) => any;
export declare const jwtEncode: ({ id, jwtSecret, tokenExpired, }: {
    id: string;
    jwtSecret: string;
    tokenExpired: any;
}) => any;
export declare const jwtDecodeToken: (token: string, jwtSecret: string) => string | object | null;

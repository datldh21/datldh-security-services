import jwt from "jsonwebtoken";

export const refreshTokenEncode = function ({
    id,
    refreshTokenSecret,
    refreshTokenExpired,
}: {
    id: string;
    refreshTokenSecret: string;
    refreshTokenExpired: any;
}) {
    return jwt.sign({ id: id }, refreshTokenSecret, {
        expiresIn: refreshTokenExpired,
    });
};

export const getAccessToken = (cookie: any) => {
    let accessToken: any;
    let arr = cookie.match(/AccessToken=\S+/gm);
    if (arr?.length > 0) {
        accessToken = arr[0].replace(/AccessToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    } else {
        return null;
    }
};

export const getRefreshToken = (cookie: any) => {
    let accessToken: any;
    let arr = cookie.match(/RefreshToken=\S+/gm);
    if (arr?.length > 0) {
        accessToken = arr[0].replace(/RefreshToken=/gm, "").replace(/\;/gm, "");
        return accessToken;
    } else {
        return null;
    }
};

export const jwtEncode = function ({
    id,
    jwtSecret,
    tokenExpired,
}: {
    id: string;
    jwtSecret: string;
    tokenExpired: any;
}) {
    return jwt.sign({ id: id }, jwtSecret, {
        expiresIn: tokenExpired,
    });
};

export const jwtDecodeToken = function (
    token: string,
    jwtSecret: string
): string | object | null {
    try {
        let decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (err) {
        return null;
    }
};

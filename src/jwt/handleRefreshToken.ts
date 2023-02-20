// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import {
//     getAccessToken,
//     getRefreshToken,
//     jwtEncode,
//     refreshTokenEncode,
// } from "../util";

// export const handleRefreshToken = async ({
//     req,
//     res,
//     refreshTokenSecret,
//     accessTokenMaxAge,
//     refreshTokenMaxAge,
// }: {
//     req: Request;
//     res: Response;
//     refreshTokenSecret: string;
//     accessTokenMaxAge: number;
//     refreshTokenMaxAge: number;
// }) => {
//     return new Promise((resolve, reject) => {
//         const cookies = req.headers.cookie;
//         let checkRefreshToken: boolean = false;
//         if (getRefreshToken(cookies) === null) {
//             checkRefreshToken = false;
//             res.status(401).send("Unauthorized");
//         } else {
//             const refreshToken = getRefreshToken(cookies);
//             const accessToken = getAccessToken(cookies);

//             if (!accessToken) {
//                 // evaluate jwt
//                 jwt.verify(
//                     refreshToken,
//                     refreshTokenSecret,
//                     async (err, decoded) => {
//                         if (err) {
//                             checkRefreshToken = false;
//                         } else {
//                             // Refresh token was still valid
//                             const newAccessToken = jwtEncode({
//                                 id: decoded.id,
//                                 jwtSecret: "",
//                                 tokenExpired: "",
//                             });
//                             const newRefreshToken = refreshTokenEncode({
//                                 id: decoded.id,
//                                 refreshTokenSecret: "",
//                                 refreshTokenExpired: "",
//                             });
//                             // Creates Secure Cookie with refresh token
//                             res.cookie("AccessToken", newAccessToken, {
//                                 httpOnly: true,
//                                 secure: true,
//                                 sameSite: "lax",
//                                 maxAge: accessTokenMaxAge,
//                             });
//                             res.cookie("RefreshToken", newRefreshToken, {
//                                 httpOnly: true,
//                                 secure: true,
//                                 sameSite: "strict",
//                                 maxAge: refreshTokenMaxAge,
//                             });
//                             checkRefreshToken = true;
//                         }
//                     }
//                 );
//             }
//         }
//         resolve(checkRefreshToken);
//     });
// };

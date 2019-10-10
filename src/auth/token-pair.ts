/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

export interface ITokenPair {
    access_token: string;
    refresh_token: string;
}
import * as jwt from "jsonwebtoken";
export const createTokenPair = (keyOrSecret: string): ITokenPair =>
    ({
        access_token: jwt.sign({
            type: "access",
        }, keyOrSecret, {
            audience: "",
            expiresIn: "1h",
            issuer: "",
            notBefore: "0s",
            subject: "",
        }),
        refresh_token: jwt.sign({
            type: "refresh",
        }, keyOrSecret, {
            audience: "",
            expiresIn: "1h",
            issuer: "",
            notBefore: "0s",
            subject: "",
        }),
    });

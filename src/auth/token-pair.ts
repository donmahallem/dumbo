export interface ITokenPair {
    access_token: string;
    refresh_token: string;
}
import * as jwt from 'jsonwebtoken';
export const createTokenPair = (keyOrSecret: string): ITokenPair => {
    return {
        access_token: jwt.sign({
            type: "access"
        }, keyOrSecret, {
            audience: "",
            issuer: "",
            subject: "",
            notBefore: "0s",
            expiresIn: "1h"
        }),
        refresh_token: jwt.sign({
            type: "refresh"
        }, keyOrSecret, {
            audience: "",
            issuer: "",
            subject: "",
            notBefore: "0s",
            expiresIn: "1h"
        })
    }
}
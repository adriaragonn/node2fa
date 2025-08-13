import { authenticator } from "otplib";
import * as QRcode from 'qrcode'
import { TotpOptions } from "../models/totp-options";

export class TotpService {
    
    private window: number;
    private name: string;

    constructor(
        options?: TotpOptions
    ){
        this.window = options?.window ?? 1;
        this.name = options?.name ?? 'Node2fa';

        authenticator.options = {window: this.window}
    }

    generateSecret():string {
        return authenticator.generateSecret();
    }

    generateOtpAuthUrl(userEmail: string, secret: string): string {
        return authenticator.keyuri(userEmail, this.name, secret)
    }

    async generateQrCode(url: string) {
        return await QRcode.toDataURL(url)
    }
    verifyToken(token: string, secret: string) {
        return authenticator.verify({ token, secret });    
    }
}
import { TotpService } from "../services/totp.service";
import { authenticator } from 'otplib';


describe('ToptService', () => {
    let service: TotpService;

    beforeEach(() => {
        service = new TotpService({name: 'Test', window: 1})
    })

    it('should not generate an empty secret', () => {
        const secret = service.generateSecret();
        expect(secret).toBeDefined();
        expect(secret).not.toBe('');
    });

    it('should be generate a 32bit secret', () => {
        const secret = service.generateSecret();
        expect(secret.length).toBeGreaterThanOrEqual(16)
    })

    it('should be generate an URL for Google Authenticator', () => {
        const secret = service.generateSecret()
        const url = service.generateOtpAuthUrl('user@example.com', secret)
        
        expect(url).toContain('otpauth://totp/')
        expect(url).toContain(secret)
    })

    it('should generate a base64 QR', async () => {
        const secret = service.generateSecret();
        const url = service.generateOtpAuthUrl('user@example.com', secret);
        const qrCodeData = await service.generateQrCode(url);
        expect(qrCodeData.startsWith('data:image/png;base64,')).toBe(true);
    });

    it('should verify a valid token', () => {
        const secret = service.generateSecret()
        const token = authenticator.generate(secret); //normally token provided by Google Authenticator
        const isValid = service.verifyToken(token, secret)

        expect(isValid).toBe(true)
    })

    it('should reject an invalid token', () => {
        const secret = service.generateSecret();
        const invalidToken = '000000';
        const isValid = service.verifyToken(invalidToken, secret);
        expect(isValid).toBe(false);
    })
})
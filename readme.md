# node2fa

[![npm version](https://img.shields.io/npm/v/node2fa.svg)](https://www.npmjs.com/package/@adriaragonn/node2fa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A simple and robust Two-Factor Authentication (2FA) library for Node.js and NestJS using TOTP.

## Features

- Generate TOTP secrets
- Generate OTP Auth URLs compatible with Google Authenticator and similar apps
- Generate QR codes for easy scanning
- Verify TOTP tokens
- Configurable time window

## Installation

```bash
npm install @adriaragonn/node2fa
```

or

```bash
yarn add @adriaragonn/node2fa
```

## Usage

```ts
import { TotpService } from 'node2fa';

async function main() {
  const service = new TotpService({ name: 'MyApp', window: 1 });

  // Generate a secret
  const secret = service.generateSecret();
  console.log('Secret:', secret);

  // Generate OTP Auth URL
  const url = service.generateOtpAuthUrl('user@example.com', secret);
  console.log('URL:', url);

  // Generate QR code (base64)
  const qrCodeBase64 = await service.generateQrCode(url);
  console.log('QR Code (Base64):', qrCodeBase64);

  // Verify a token
  const token = '123456'; // token from Google Authenticator
  const isValid = service.verifyToken(token, secret);
  console.log('Is token valid?', isValid);
}

main();
```

## API

### `new TotpService(options?: TotpOptions)`

Creates a new TOTP service instance.

**Options:**
- `name` (string): Name of your application (default: "Node2fa")
- `window` (number): Verification window in steps (default: `1`)

### `generateSecret(): string`
Generates a new TOTP secret.

### `generateOtpAuthUrl(userEmail: string, secret: string): string`
Generates an OTP Auth URL compatible with Google Authenticator.

### `generateQrCode(url: string): Promise<string>`
Generates a QR code in base64 format from the OTP Auth URL.

### `verifyToken(token: string, secret: string): boolean`
Verifies a TOTP token against a secret.

## License

This project is licensed under the MIT License.


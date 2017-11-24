# csgo-initializer

Takes an Steam account with a phone associated and receive the SMS number to get:
1. Shared secret.
2. Identity secret.
3. Revocation code.

These codes are used to generate verification codes for libraries like steam-user and steam-totp.

```
npm install
npm start
```
import * as CryptoJS from 'crypto-js';

const privateKey =  'secret key';

export const encryptValue = (value: string) =>
CryptoJS.AES.encrypt(value, privateKey).toString();

export const decryptValue = (value: string) =>
CryptoJS.AES.decrypt(value, privateKey).toString(CryptoJS.enc.Utf8);
import crypto from 'crypto'

export const encryptResponesData = (text: any) => {
    const keyValue: any = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
    const ivValue: any = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV
    const key = Buffer.from(keyValue, 'hex');
    const iv = Buffer.from(ivValue, 'hex');

    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(JSON.stringify(text));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex')
}

export const decryptRequestData = (text: any) => {
    const keyValue: any = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
    const ivValue: any = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV
    const key = Buffer.from(keyValue, 'hex');
    const iv = Buffer.from(ivValue, 'hex');

    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

import crypto from 'crypto'

export const Aes256 = {
    encryptUsingAES256,
    decryptUsingAES256
};

function encryptUsingAES256(val) {
    let cipher = crypto.createCipheriv("aes-256-cbc", "bf3c199c2470cb477d907b1e0917c17b", "5183666c72eec9e4");
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decryptUsingAES256(encrypted) {
    let decipher = crypto.createDecipheriv("aes-256-cbc", "bf3c199c2470cb477d907b1e0917c17b", "5183666c72eec9e4");
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}
import crypto = require('crypto');

const BITES_LENGTH = 4;

export const generateHash = () => crypto.randomBytes(BITES_LENGTH).toString('base64url');
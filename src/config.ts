// APPLICATION
const appPort = process.env.APP_PORT;
if (!appPort) {
   throw new Error('APP_PORT enviroment variable is not set');
}
const APP_PORT = parseInt(appPort, 10);
if (!APP_PORT) {
   throw new Error('incorrect APP_PORT value');
}

const APP_DOMAIN = process.env.APP_DOMAIN;
if (!APP_DOMAIN) {
   throw new Error('APP_DOMAIN enviroment variable is not set');
}
try {
   new URL(APP_DOMAIN);
} catch {
   throw new Error('APP_DOMAIN enviroment variable is not a valid URL');
}


// DATABASE
const DB_HOST = process.env.DB_HOST;
if (!DB_HOST) {
   throw new Error('DB_HOST enviroment variable is not set');
}

const dbPort = process.env.DB_PORT;
if (!dbPort) {
   throw new Error('DB_PORT enviroment variable is not set');
}
const DB_PORT = parseInt(dbPort, 10);
if (!DB_PORT) {
   throw new Error('incorrect DB_PORT value');
}

const DB_NAME = process.env.DB_NAME;
if (!DB_NAME) {
   throw new Error('DB_NAME enviroment variable is not set');
}

const DB_USER = process.env.DB_USER;
if (!DB_USER) {
   throw new Error('DB_USER enviroment variable is not set');
}

const DB_PASS = process.env.DB_PASS;
if (!DB_PASS) {
   throw new Error('DB_PASS enviroment variable is not set');
}

const DB_TIME = process.env.DB_TIME;
if (!DB_TIME) {
   throw new Error('DB_TIME enviroment variable is not set');
}


// BLOCKCHAIN
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
if (!CONTRACT_ADDRESS) {
   throw new Error('CONTRACT_ADDRESS enviroment variable is not set');
}

const SIGNER_KEY = process.env.SIGNER_KEY;
if (!SIGNER_KEY) {
   throw new Error('SIGNER_KEY enviroment variable is not set');
}

export const config = Object.freeze({
   // APPLICATION
   APP_PORT,
   APP_DOMAIN,

   // DATABASE
   DB_HOST,
   DB_PORT,
   DB_NAME,
   DB_USER,
   DB_PASS,
   DB_TIME,

   // BLOCKCHAIN
   CONTRACT_ADDRESS,
   SIGNER_KEY,
});
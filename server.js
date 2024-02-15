import dotenv from 'dotenv';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import app from './app.js';
const port = 3000;

dotenv.config();
const key = readFileSync(process.env.SSL_KEY_PATH);
const cert = readFileSync(process.env.SSL_CERT_PATH);
const server = createServer({ key: key, cert: cert }, app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

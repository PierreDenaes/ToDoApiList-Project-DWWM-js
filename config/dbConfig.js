import dotenv from 'dotenv';
import { createConnection } from 'mysql2';

dotenv.config();

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

export default db;

import 'dotenv/config';
import mysql from 'mysql2/promise';

const requiredVariables = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
];

const missingVariables = requiredVariables.filter(
    variable => !process.env[variable]?.trim()
);

if (missingVariables.length > 0) {
    throw new Error(
        `Missing database environment variables: ${missingVariables.join(', ')}`
    );
}

const isProduction = process.env.NODE_ENV === 'production';
const useSSL = process.env.DB_SSL === 'true';

if (isProduction && !useSSL) {
    throw new Error(
        'Database SSL must be enabled in production. Set DB_SSL=true.'
    );
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: useSSL
        ? {
              minVersion: 'TLSv1.2'
          }
        : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
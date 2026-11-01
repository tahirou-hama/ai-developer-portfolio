
import pool from './db.js';

try {
    const [rows] = await pool.query(
        'SELECT DATABASE() AS databaseName, NOW() AS serverTime'
    );

    console.log('MySQL connection successful:', rows[0]);
} catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exitCode = 1;
} finally {
    await pool.end();
}

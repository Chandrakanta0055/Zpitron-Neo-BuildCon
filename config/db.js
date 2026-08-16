const mysql = require('mysql2/promise');
const Store = require('../data/store');

// MySQL Connection Pool (Active in Production / when MySQL server is running)
let pool = null;

async function initDB() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'ziptron_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test connection with timeout
        const conn = await pool.getConnection();
        conn.release();
        console.log('✅ MySQL Database Connected Successfully');
        return pool;
    } catch (err) {
        console.log('ℹ️  MySQL not detected locally. Using Local High-Speed Data Engine (data/store.js)');
        return null;
    }
}

// Start async check
initDB();

module.exports = {
    pool,
    Store
};

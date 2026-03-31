require("dotenv").config()

const { Pool } = require("pg")

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "schachverein"
})

pool.on("error", (err) => {
    console.error("Fehler im PostgreSQL Connection Pool:", err)
})

async function initDatabase() {
    const client = await pool.connect()

    try {
        console.log("Initialisiere Datenbank...")

        await client.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        await client.query(`
            CREATE TABLE IF NOT EXISTS results (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                team1 VARCHAR(255) NOT NULL,
                team2 VARCHAR(255) NOT NULL,
                score VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        await client.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        console.log("Datenbanktabellen existieren und sind bereit.")
    } catch (err) {
        console.error("Fehler beim Initialisieren der Datenbank:", err)
    } finally {
        client.release()
    }
}

module.exports = {
    pool,
    initDatabase,
    query: (text, params) => pool.query(text, params)
}
require("dotenv").config()

const { Pool } = require("pg")

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME
})

async function run() {
    try {
        const nowResult = await pool.query("SELECT NOW() AS now")
        console.log("DB-Verbindung OK:", nowResult.rows[0].now)

        const tableResult = await pool.query(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
        )

        console.log("Tabellen:", tableResult.rows.map((row) => row.table_name))
    } catch (err) {
        console.error("DB-Test fehlgeschlagen:", err.message)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

run()
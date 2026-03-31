const { pool } = require("../config/database")

async function getMessages(req, res) {
    try {
        const result = await pool.query("SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC")
        res.json({
            message: "Alle Kontaktanfragen",
            messages: result.rows
        })
    } catch (err) {
        console.error("Fehler beim Abrufen von Nachrichten:", err)
        res.status(500).json({
            message: "Fehler beim Abrufen von Nachrichten"
        })
    }
}

async function createMessage(req, res) {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "name, email und message sind erforderlich"
        })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "ungueltige E-Mail-Adresse"
        })
    }

    try {
        const result = await pool.query(
            "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, name, email, message, created_at", [name, email, message]
        )

        res.status(201).json({
            message: "Nachricht erfolgreich gespeichert",
            entry: result.rows[0]
        })
    } catch (err) {
        console.error("Fehler beim Speichern von Nachricht:", err)
        res.status(500).json({
            message: "Fehler beim Speichern von Nachricht"
        })
    }
}

module.exports = {
    getMessages,
    createMessage
}
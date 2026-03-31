const { pool } = require("../config/database")

async function getResults(req, res) {
    try {
        const result = await pool.query("SELECT id, date, team1, team2, score FROM results ORDER BY date DESC")
        res.json({
            message: "Alle Ergebnisse",
            results: result.rows
        })
    } catch (err) {
        console.error("Fehler beim Abrufen von Ergebnissen:", err)
        res.status(500).json({
            message: "Fehler beim Abrufen von Ergebnissen"
        })
    }
}

async function createResult(req, res) {
    const { date, team1, team2, score } = req.body

    if (!team1 || !team2 || !score) {
        return res.status(400).json({
            message: "team1, team2 und score sind erforderlich"
        })
    }

    try {
        const resultDate = date || new Date().toISOString().slice(0, 10)
        const result = await pool.query(
            "INSERT INTO results (date, team1, team2, score) VALUES ($1, $2, $3, $4) RETURNING id, date, team1, team2, score", [resultDate, team1, team2, score]
        )

        res.status(201).json({
            message: "Ergebnis gespeichert",
            result: result.rows[0]
        })
    } catch (err) {
        console.error("Fehler beim Speichern von Ergebnis:", err)
        res.status(500).json({
            message: "Fehler beim Speichern von Ergebnis"
        })
    }
}

module.exports = {
    getResults,
    createResult
}
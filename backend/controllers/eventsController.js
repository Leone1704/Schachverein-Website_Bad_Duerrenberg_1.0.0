const { pool } = require("../config/database")

async function getEvents(req, res) {
    try {
        const result = await pool.query("SELECT id, title, date, description FROM events ORDER BY date ASC")
        res.json({
            message: "Alle Events",
            events: result.rows
        })
    } catch (err) {
        console.error("Fehler beim Abrufen von Events:", err)
        res.status(500).json({
            message: "Fehler beim Abrufen von Events"
        })
    }
}

async function createEvent(req, res) {
    const { title, date, description } = req.body

    if (!title || !date) {
        return res.status(400).json({
            message: "title und date sind erforderlich"
        })
    }

    try {
        const result = await pool.query(
            "INSERT INTO events (title, date, description) VALUES ($1, $2, $3) RETURNING id, title, date, description", [title, date, description || ""]
        )

        res.status(201).json({
            message: "Event erstellt",
            event: result.rows[0]
        })
    } catch (err) {
        console.error("Fehler beim Erstellen von Event:", err)
        res.status(500).json({
            message: "Fehler beim Erstellen von Event"
        })
    }
}

async function deleteEvent(req, res) {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({
            message: "Event ID erforderlich"
        })
    }

    try {
        const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING id, title, date, description", [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Event nicht gefunden"
            })
        }

        res.json({
            message: "Event gelöscht",
            event: result.rows[0]
        })
    } catch (err) {
        console.error("Fehler beim Löschen von Event:", err)
        res.status(500).json({
            message: "Fehler beim Löschen von Event"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    deleteEvent
}
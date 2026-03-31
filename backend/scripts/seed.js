const { pool, initDatabase } = require("../config/database")

async function seedEvents() {
    const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM events")
    if (countResult.rows[0].count > 0) {
        console.log("events: uebersprungen (bereits Daten vorhanden)")
        return
    }

    await pool.query(
        `INSERT INTO events (title, date, description) VALUES
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9)`, [
            "Bezirksliga Runde 2",
            "2026-04-12",
            "Heimspiel gegen SG Beispielstadt",
            "Offenes Schnellschachturnier",
            "2026-04-26",
            "7 Runden Schweizer System im Vereinsheim",
            "Vereinsmeisterschaft Runde 1",
            "2026-05-10",
            "Start der neuen Vereinsmeisterschaft"
        ]
    )

    console.log("events: 3 Datensaetze eingefuegt")
}

async function seedResults() {
    const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM results")
    if (countResult.rows[0].count > 0) {
        console.log("results: uebersprungen (bereits Daten vorhanden)")
        return
    }

    await pool.query(
        `INSERT INTO results (date, team1, team2, score) VALUES
        ($1, $2, $3, $4),
        ($5, $6, $7, $8),
        ($9, $10, $11, $12)`, [
            "2026-03-29",
            "SV Musterstadt",
            "SC Feldrand",
            "4.5 : 3.5",
            "2026-03-15",
            "SK Beispielort",
            "SV Musterstadt",
            "5.0 : 3.0",
            "2026-03-01",
            "Vereinsblitz-Monatsturnier",
            "Gesamtwertung",
            "Finale"
        ]
    )

    console.log("results: 3 Datensaetze eingefuegt")
}

async function seedMessages() {
    const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM messages")
    if (countResult.rows[0].count > 0) {
        console.log("messages: uebersprungen (bereits Daten vorhanden)")
        return
    }

    await pool.query(
        `INSERT INTO messages (name, email, message) VALUES
        ($1, $2, $3),
        ($4, $5, $6)`, [
            "Max Muster",
            "max@example.com",
            "Ich moechte gern beim naechsten Trainingsabend reinschauen.",
            "Erika Beispiel",
            "erika@example.com",
            "Gibt es noch freie Plaetze in der Jugendgruppe?"
        ]
    )

    console.log("messages: 2 Datensaetze eingefuegt")
}

async function run() {
    try {
        await initDatabase()
        await seedEvents()
        await seedResults()
        await seedMessages()
        console.log("Seed abgeschlossen.")
    } catch (err) {
        console.error("Seed fehlgeschlagen:", err.message)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

run()
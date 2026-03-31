const fs = require("fs")
const path = require("path")

const DB_DIR = path.join(__dirname, "..", "..", "database")

function ensureDirExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

function readDb(filename) {
    ensureDirExists(DB_DIR)
    const filepath = path.join(DB_DIR, filename)

    if (!fs.existsSync(filepath)) {
        return []
    }

    const content = fs.readFileSync(filepath, "utf-8")
    try {
        return JSON.parse(content)
    } catch (e) {
        console.error(`Fehler beim Parsen von ${filename}:`, e.message)
        return []
    }
}

function writeDb(filename, data) {
    ensureDirExists(DB_DIR)
    const filepath = path.join(DB_DIR, filename)
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8")
}

module.exports = {
    readDb,
    writeDb
}
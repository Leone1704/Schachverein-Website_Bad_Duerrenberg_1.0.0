const express = require("express")
const cors = require("cors")
const path = require("path")

const { initDatabase } = require("./config/database")

const eventsRoutes = require("./routes/events")
const resultsRoutes = require("./routes/results")
const usersRoutes = require("./routes/users")
const imagesRoutes = require("./routes/images")
const authRoutes = require("./routes/auth")
const messagesRoutes = require("./routes/messages")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/events", eventsRoutes)
app.use("/api/results", resultsRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/images", imagesRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

const frontendPath = path.join(__dirname, "..", "frontend")
app.use(express.static(frontendPath))

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
})

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await initDatabase()

        app.listen(PORT, () => {
            console.log("Server läuft auf Port " + PORT)
            console.log("Umgebung: " + (process.env.NODE_ENV || "development"))
        })
    } catch (err) {
        console.error("Fehler beim Starten des Servers:", err)
        process.exit(1)
    }
}

startServer()
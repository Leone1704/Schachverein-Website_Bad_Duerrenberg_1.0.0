const API_BASE = "http://localhost:3000/api"

function formatGermanDate(isoDate) {
    const date = new Date(isoDate)
    if (Number.isNaN(date.getTime())) {
        return isoDate
    }

    return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

async function loadTurniereData() {
    const eventsTimeline = document.getElementById("eventsTimeline")
    const resultsTableBody = document.getElementById("resultsTableBody")
    const statusBox = document.getElementById("turniereStatus")

    if (!eventsTimeline || !resultsTableBody) {
        return
    }

    try {
        const [eventsResponse, resultsResponse] = await Promise.all([
            fetch(`${API_BASE}/events`),
            fetch(`${API_BASE}/results`)
        ])

        if (!eventsResponse.ok || !resultsResponse.ok) {
            throw new Error("API-Antwort nicht erfolgreich")
        }

        const eventsData = await eventsResponse.json()
        const resultsData = await resultsResponse.json()

        const events = Array.isArray(eventsData.events) ? eventsData.events : []
        const results = Array.isArray(resultsData.results) ? resultsData.results : []

        if (events.length === 0) {
            eventsTimeline.innerHTML = "<div class=\"timeline-item\"><strong>Keine Termine</strong>Aktuell sind keine Turniertermine vorhanden.</div>"
        } else {
            eventsTimeline.innerHTML = events
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => {
                    const dateText = formatGermanDate(event.date)
                    const description = event.description || "Keine Beschreibung"
                    return `<div class=\"timeline-item\"><strong>${dateText}: ${event.title}</strong>${description}</div>`
                })
                .join("")
        }

        if (results.length === 0) {
            resultsTableBody.innerHTML = "<tr><td colspan=\"3\">Keine Ergebnisse vorhanden.</td></tr>"
        } else {
            resultsTableBody.innerHTML = results
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((result) => {
                    const dateText = formatGermanDate(result.date)
                    return `<tr><td>${dateText}</td><td>${result.team1} vs. ${result.team2}</td><td>${result.score}</td></tr>`
                })
                .join("")
        }

        if (statusBox) {
            statusBox.hidden = false
            statusBox.className = "notice"
            statusBox.textContent = "Daten erfolgreich aus dem Backend geladen."
        }
    } catch (error) {
        eventsTimeline.innerHTML = "<div class=\"timeline-item\"><strong>Fehler</strong>Turniertermine konnten nicht geladen werden.</div>"
        resultsTableBody.innerHTML = "<tr><td colspan=\"3\">Ergebnisse konnten nicht geladen werden.</td></tr>"

        if (statusBox) {
            statusBox.hidden = false
            statusBox.className = "notice notice-error"
            statusBox.textContent = "Backend nicht erreichbar. Bitte pruefe, ob der Server auf Port 3000 laeuft."
        }

        console.error(error)
    }
}

function setupContactPage() {
    const messagesList = document.getElementById("messagesList")

    if (!messagesList) {
        return
    }

    loadMessages()
}

async function loadMessages() {
    const messagesList = document.getElementById("messagesList")

    if (!messagesList) {
        return
    }

    try {
        const response = await fetch(`${API_BASE}/messages`)

        if (!response.ok) {
            throw new Error("Anfragen konnten nicht geladen werden")
        }

        const data = await response.json()
        const messages = Array.isArray(data.messages) ? data.messages : []

        if (messages.length === 0) {
            messagesList.innerHTML = "<div class=\"timeline-item\"><strong>Keine Anfragen</strong>Aktuell sind keine Kontaktanfragen vorhanden.</div>"
        } else {
            messagesList.innerHTML = messages
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((msg) => {
                    const dateText = formatGermanDate(msg.createdAt)
                    return `<div class=\"timeline-item\"><strong>${dateText}: ${msg.name} (${msg.email})</strong>${msg.message}</div>`
                })
                .join("")
        }
    } catch (error) {
        messagesList.innerHTML = "<div class=\"timeline-item\"><strong>Fehler</strong>Anfragen konnten nicht geladen werden.</div>"
        console.error(error)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTurniereData()
    setupContactPage()
})
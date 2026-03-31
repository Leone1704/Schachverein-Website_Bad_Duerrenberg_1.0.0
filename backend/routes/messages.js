const express = require("express")

const router = express.Router()

const {
    getMessages,
    createMessage
} = require("../controllers/messagesController")

router.get("/", getMessages)

router.post("/", createMessage)

module.exports = router
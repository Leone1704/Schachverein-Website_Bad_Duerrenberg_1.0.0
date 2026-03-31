const express = require("express")

const router = express.Router()

const {
    login,
    verifyCode
} = require("../controllers/authController")

router.post("/login", login)

router.post("/verify", verifyCode)

module.exports = router
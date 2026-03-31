const express = require("express")

const router = express.Router()

const {
    getImages,
    uploadImage
} = require("../controllers/imagesController")

router.get("/", getImages)

router.post("/", uploadImage)

module.exports = router
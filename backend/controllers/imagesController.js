function getImages(req, res) {

    res.json({
        message: "Alle Bilder"
    })

}

function uploadImage(req, res) {

    res.json({
        message: "Bild hochgeladen"
    })

}

module.exports = {
    getImages,
    uploadImage
}
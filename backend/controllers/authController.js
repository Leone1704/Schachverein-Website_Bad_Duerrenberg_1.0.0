function login(req, res) {

    const { email, password } = req.body

    res.json({
        message: "Login Versuch",
        email
    })

}

function verifyCode(req, res) {

    const { code } = req.body

    res.json({
        message: "Code geprüft",
        code
    })

}

module.exports = {
    login,
    verifyCode
}
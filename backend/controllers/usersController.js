function getUsers(req, res) {

    res.json({
        message: "Alle Benutzer"
    })

}

function createUser(req, res) {

    const { name, email, role } = req.body

    res.json({
        message: "User erstellt",
        name,
        email,
        role
    })

}

function deleteUser(req, res) {

    const id = req.params.id

    res.json({
        message: "User gelöscht",
        id
    })

}

module.exports = {
    getUsers,
    createUser,
    deleteUser
}
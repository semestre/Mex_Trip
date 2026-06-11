const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST - Registrar usuario
router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Iniciar sesión
router.post("/login", (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            if (!user) {
                return res.status(401).json("Credenciales incorrectas");
            }

            res.json({
                message: "Login exitoso",
                user
            });
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
const express = require("express");
const router = express.Router();

const authService = require("../services/auth.service");

// POST - Registrar usuario
router.post("/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const user = await authService.registerUser({
            username,
            email,
            password
        });

        res.json(user);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST - Iniciar sesión
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email y contraseña son obligatorios"
            });
        }

        const user = await authService.loginUser(
            email,
            password
        );

        if (!user) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }

        res.json({
            message: "Login exitoso",
            user
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const destinationService = require("../services/destination.service");

// GET - Obtener todos los destinos
router.get("/", async (req, res) => {
    try {
        const destinations =
            await destinationService.getAllDestinations();

        res.json(destinations);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// GET - Obtener un destino por ID
router.get("/:id", async (req, res) => {
    try {

        const destination =
            await destinationService.getDestinationById(req.params.id);

        if (!destination) {
            return res.status(404).json({
                message: "Destino no encontrado"
            });
        }

        res.json(destination);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST - Crear destino
router.post("/", async (req, res) => {
    try {

        const {
            name,
            duration,
            pointA,
            pointB,
            schedule,
            car
        } = req.body;

        // Validation
        if (
            !name ||
            !duration ||
            !pointA ||
            !pointB ||
            !schedule ||
            !car
        ) {
            return res.status(400).json({
                message: "Todos los campos obligatorios deben completarse"
            });
        }

        const destination =
            await destinationService.createDestination(req.body);

        res.json(destination);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// PATCH - Actualizar destino
router.patch("/:id", async (req, res) => {
    try {

        const result =
            await destinationService.updateDestination(
                req.params.id,
                req.body
            );

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// DELETE - Eliminar destino
router.delete("/:id", async (req, res) => {
    try {

        const result =
            await destinationService.deleteDestination(
                req.params.id
            );

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = router;
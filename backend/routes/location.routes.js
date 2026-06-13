const express = require("express");
const router = express.Router();

const locationService = require("../services/location.service");

// GET - Obtener todas las ubicaciones
router.get("/", async (req, res) => {
    try {
        const locations =
            await locationService.getAllLocations();

        res.json(locations);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// GET - Obtener una ubicación por ID
router.get("/:id", async (req, res) => {
    try {

        const location =
            await locationService.getLocationById(req.params.id);

        if (!location) {
            return res.status(404).json({
                message: "Ubicación no encontrada"
            });
        }

        res.json(location);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST - Crear ubicación
router.post("/", async (req, res) => {
    try {

        const {
            name,
            latitude,
            longitude
        } = req.body;

        // Validation
        if (
            !name ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "Nombre, latitud y longitud son obligatorios"
            });
        }

        const location =
            await locationService.createLocation(req.body);

        res.json(location);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// PATCH - Actualizar ubicación
router.patch("/:id", async (req, res) => {
    try {

        const result =
            await locationService.updateLocation(
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

// DELETE - Eliminar ubicación
router.delete("/:id", async (req, res) => {
    try {

        const result =
            await locationService.deleteLocation(
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
const express = require("express");
const router = express.Router();

const carService = require("../services/car.service");

// GET - Obtener todos los vehículos
router.get("/", async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// GET - Obtener un vehículo por ID
router.get("/:id", async (req, res) => {
    try {
        const car = await carService.getCarById(req.params.id);

        if (!car) {
            return res.status(404).json({
                message: "Vehículo no encontrado"
            });
        }

        res.json(car);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST - Crear un nuevo vehículo
router.post("/", async (req, res) => {
    try {

        const { brand, model, year, capacity } = req.body;

        // Validation
        if (!brand || !model || !year || !capacity) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const car = await carService.createCar({
            brand,
            model,
            year,
            capacity
        });

        res.json(car);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// PATCH - Actualizar vehículo
router.patch("/:id", async (req, res) => {
    try {

        const { brand, model, year, capacity } = req.body;

        if (!brand || !model || !year || !capacity) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const result = await carService.updateCar(
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

// DELETE - Eliminar vehículo
router.delete("/:id", async (req, res) => {
    try {

        const result = await carService.deleteCar(
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
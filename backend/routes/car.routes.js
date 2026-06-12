const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// GET - Obtener todos los vehículos
router.get("/", (req, res) => {
    Car.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// GET - Obtener un vehículo por ID
router.get("/:id", (req, res) => {
    Car.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json("Vehículo no encontrado");
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Crear un nuevo vehículo
router.post("/", (req, res) => {
    const newCar = new Car({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        capacity: req.body.capacity
    });

    newCar.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// PATCH - Actualizar un vehículo
router.patch("/:id", (req, res) => {
    Car.updateOne(
        { _id: req.params.id },
        {
            $set: {
                brand: req.body.brand,
                model: req.body.model,
                year: req.body.year,
                capacity: req.body.capacity
            }
        }
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// DELETE - Eliminar un vehículo
router.delete("/:id", (req, res) => {
    Car.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
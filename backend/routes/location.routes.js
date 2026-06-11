const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// GET - Obtener todas las ubicaciones
router.get("/", (req, res) => {
    Location.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// GET - Obtener una ubicación por ID
router.get("/:id", (req, res) => {
    Location.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json("Ubicación no encontrada");
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Crear una nueva ubicación
router.post("/", (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    newLocation.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// PATCH - Actualizar una ubicación por ID
router.patch("/:id", (req, res) => {
    Location.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                latitude: req.body.latitude,
                longitude: req.body.longitude
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

// DELETE - Eliminar una ubicación por ID
router.delete("/:id", (req, res) => {
    Location.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
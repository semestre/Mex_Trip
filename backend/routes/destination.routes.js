const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// GET - Obtener todos los destinos
router.get("/", (req, res) => {
    Destination.find().populate("car")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// GET - Obtener un destino por ID
router.get("/:id", (req, res) => {
    Destination.findById(req.params.id).populate("car")
        .then(data => {
            if (!data) {
                return res.status(404).json("Destino no encontrado");
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Crear un nuevo destino
router.post("/", (req, res) => {
    const newDestination = new Destination({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,

        pointA: {
            latitude: req.body.pointA.latitude,
            longitude: req.body.pointA.longitude
        },

        pointB: {
            latitude: req.body.pointB.latitude,
            longitude: req.body.pointB.longitude
        },

        schedule: req.body.schedule,

        car: req.body.car
    });

    newDestination.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// PATCH - Actualizar un destino
router.patch("/:id", (req, res) => {
    Destination.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                duration: req.body.duration,

                pointA: {
                    latitude: req.body.pointA.latitude,
                    longitude: req.body.pointA.longitude
                },

                pointB: {
                    latitude: req.body.pointB.latitude,
                    longitude: req.body.pointB.longitude
                },

                schedule: req.body.schedule,

                car: req.body.car
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

// DELETE - Eliminar un destino
router.delete("/:id", (req, res) => {
    Destination.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
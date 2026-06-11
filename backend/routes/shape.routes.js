const express = require("express");
const router = express.Router();
const Shape = require("../models/Shape");

// GET - Obtener todas las figuras
router.get("/", (req, res) => {
    Shape.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// GET - Obtener una figura por ID
router.get("/:id", (req, res) => {
    Shape.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json("Figura no encontrada");
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Crear una nueva figura
router.post("/", (req, res) => {
    const newShape = new Shape({
        name: req.body.name,
        points: req.body.points
    });

    newShape.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// PATCH - Actualizar una figura por ID
router.patch("/:id", (req, res) => {
    Shape.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                points: req.body.points
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

// DELETE - Eliminar una figura por ID
router.delete("/:id", (req, res) => {
    Shape.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
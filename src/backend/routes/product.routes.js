const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET - Obtener todos los productos
router.get("/", (req, res) => {
    Product.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// GET - Obtener producto por ID
router.get("/:id", (req, res) => {
    Product.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json("Producto no encontrado");
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// POST - Crear producto
router.post("/", (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newProduct.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

// PATCH - Actualizar producto
router.patch("/:id", (req, res) => {
    Product.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
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

// DELETE - Eliminar producto
router.delete("/:id", (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
const express = require("express");
const router = express.Router();

const productService = require("../services/product.service");

// GET - Obtener todos los productos
router.get("/", async (req, res) => {
    try {

        const products =
            await productService.getAllProducts();

        res.json(products);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// GET - Obtener un producto por ID
router.get("/:id", async (req, res) => {
    try {

        const product =
            await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.json(product);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// POST - Crear producto
router.post("/", async (req, res) => {
    try {

        const {
            name,
            price,
            image
        } = req.body;

        // Validation
        if (!name || !price || !image) {
            return res.status(400).json({
                message: "Nombre, precio e imagen son obligatorios"
            });
        }

        const product =
            await productService.createProduct(req.body);

        res.json(product);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// PATCH - Actualizar producto
router.patch("/:id", async (req, res) => {
    try {

        const result =
            await productService.updateProduct(
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

// DELETE - Eliminar producto
router.delete("/:id", async (req, res) => {
    try {

        const result =
            await productService.deleteProduct(
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
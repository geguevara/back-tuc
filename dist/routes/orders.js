"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const recoleccionErrores_1 = require("../middlewares/recoleccionErrores");
const validateVerified_1 = require("../middlewares/validateVerified");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", [validateJWT_1.default, recoleccionErrores_1.recoleccionErrores], orders_1.getOrders);
router.post("/", [
    validateJWT_1.default,
    validateVerified_1.isVerified,
    (0, express_validator_1.check)("items", "La lista de productos es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es obligatorio").not().isEmpty(),
    recoleccionErrores_1.recoleccionErrores
], orders_1.createOrder);
exports.default = router;

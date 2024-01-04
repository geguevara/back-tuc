import { Router } from "express";
import {  createOrder, getOrders } from "../controllers/orders";
import validateJWT from "../middlewares/validateJWT";
import { recoleccionErrores } from "../middlewares/recoleccionErrores";
import { isVerified } from "../middlewares/validateVerified";
import { check } from "express-validator"

const router = Router();

router.get("/",[validateJWT, recoleccionErrores], getOrders)

router.post("/", [
    validateJWT,
    isVerified,
    check("items", "La lista de productos es obligatorio").not().isEmpty(),
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    recoleccionErrores
], createOrder)

export default router
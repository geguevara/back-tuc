"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const recoleccionErrores_1 = require("../middlewares/recoleccionErrores");
const router = (0, express_1.Router)();
router.get("/", [validateJWT_1.default, recoleccionErrores_1.recoleccionErrores], order_1.getOrders);
exports.default = router;

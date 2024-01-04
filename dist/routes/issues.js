"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issues_1 = require("../controllers/issues");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const validateRol_1 = require("../middlewares/validateRol");
const express_validator_1 = require("express-validator");
const recoleccionErrores_1 = require("../middlewares/recoleccionErrores");
const router = (0, express_1.Router)();
router.post("/", [
    validateJWT_1.default,
    validateRol_1.isAdmin,
    (0, express_validator_1.check)("title", "Eltitulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("desc", "La descripcion es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("priority", "La prioridad es obligatorio").not().isEmpty(),
    recoleccionErrores_1.recoleccionErrores
], issues_1.newIssue);
exports.default = router;

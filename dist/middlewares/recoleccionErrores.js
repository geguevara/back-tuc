"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoleccionErrores = void 0;
const express_validator_1 = require("express-validator");
const recoleccionErrores = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }
    else {
        next();
    }
};
exports.recoleccionErrores = recoleccionErrores;

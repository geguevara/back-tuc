"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validationDb_1 = require("../helpers/validationDb");
const recoleccionErrores_1 = require("../middlewares/recoleccionErrores");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("apellido", "El apellido es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe tener 6 caracteres como mínimo").isLength({ min: 6 }),
    (0, express_validator_1.check)("email").custom(validationDb_1.existeEmail),
    recoleccionErrores_1.recoleccionErrores
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe tener 6 caracteres como mínimo").isLength({ min: 6 }),
    recoleccionErrores_1.recoleccionErrores
], auth_1.login);
router.patch("/verified", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("code", "El código de verificación es requerido").not().isEmpty(),
    recoleccionErrores_1.recoleccionErrores
], auth_1.verifiedUser);
exports.default = router;

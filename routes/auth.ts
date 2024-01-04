import { Router } from "express";
import { login, register, verifiedUser } from "../controllers/auth";
import { check } from "express-validator";
import { existeEmail } from "../helpers/validationDb";
import { recoleccionErrores } from "../middlewares/recoleccionErrores";

const router= Router()

router.post('/register', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres como mínimo").isLength({min:6}),
    check("email").custom(existeEmail),
    recoleccionErrores
],register)

router.post("/login",[
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres como mínimo").isLength({min:6}),
    recoleccionErrores
],login)

router.patch("/verified",[
    check("email", "El email es obligatorio").not().isEmpty(),
    check("code", "El código de verificación es requerido").not().isEmpty(),
    recoleccionErrores
],verifiedUser)

export default router
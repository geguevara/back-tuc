import { Router } from "express";
import { newIssue } from "../controllers/issues";
import validateJWT from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRol";
import {check} from "express-validator"
import { recoleccionErrores } from "../middlewares/recoleccionErrores";


const router= Router();

router.post("/",[
    validateJWT,
    isAdmin,
    check("title", "Eltitulo es obligatorio").not().isEmpty(),
    check("desc", "La descripcion es obligatorio").not().isEmpty(),
    check("priority", "La prioridad es obligatorio").not().isEmpty(),
    recoleccionErrores
], newIssue)

export default router
import { Response, Request, NextFunction } from "express";
import { ROLES } from "../helpers/constants";


export const isAdmin= (req: Request, res:Response, next: NextFunction)=>{
    const {rol}=req.body.userConfirm;
    if (rol!==ROLES.admin) {
        res.status(401).json({
            msj: "No es admin"
        })
        return
    }
    next()
}
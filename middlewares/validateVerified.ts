import { Request, Response, NextFunction } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) =>{
    const { verified } = req.body.userConfirm;

    if(!verified){
        res.status(401).json({
            msj: "El usuario no ha sido verificado correctamente"
        })
        return;
    }
    next()
}
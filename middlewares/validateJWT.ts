import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload} from "jsonwebtoken"
import Usuario, {IUser} from "../models/usuario";

const validateJWT =async (req:Request, res:Response, next:NextFunction) :Promise<void>=> {
    const token = req.headers["x-token"] as string;
    if (!token) {
        res.status(401).json({
            msj: "No hay token en la petición"
        })
        return
    }
    try {
        const secretPass = process.env.SECRETPASS as string
        const payload= jwt.verify(token, secretPass) as JwtPayload;
        const {id} = payload;

        const userConfirm: IUser | null = await Usuario.findById(id)
        if(!userConfirm){
            res.status(401).json({
                msj: "El token no es válido"
            })
            return
        }

        req.body.userConfirm= userConfirm;
        req.body.id= id;
        
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msj:"Token inválido"
        })
        
    }
}

export default validateJWT
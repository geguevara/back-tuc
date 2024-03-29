import { Request, Response } from "express";
import Usuario, {IUser} from '../models/usuario';
import { ROLES } from "../helpers/constants";
import generateJWT from "../helpers/generateJWT"

import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";

export const register =async (req: Request, res: Response)=>{
    const {nombre, apellido, email, password, rol}:IUser= req.body;
    const usuario =new Usuario ({nombre, apellido, email, password, rol})

    const salt = bcryptjs.genSaltSync()
    usuario.password= bcryptjs.hashSync(password, salt)
    const adminKey= req.headers["admin-key"]
    if(adminKey===process.env.KEYFORADM){
        usuario.rol = ROLES.admin
    }

    const newCode =randomstring.generate(8)
    usuario.code= newCode

    await usuario.save()
    await sendEmail(email, newCode)

    res.status(201).json({
        usuario
    })
}

export const login =async (req:Request, res: Response) :Promise<void> => {
    const {email, password}: IUser= req.body;
    try {
        const usuario= await Usuario.findOne({email})
        if (!usuario) {
            res.status(400).json({
                msj:" No se encontro email en la base de datos"
            })
            return
        }
        const validarPass= bcryptjs.compareSync(password, usuario.password)

        if (!validarPass) {
            res.status(400).json({
                msj: " La contraseña es incorrecta"
            })
            return
        }

        const token= await generateJWT(usuario.id)

        res.json({ usuario, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msj: "Error en el servidor"
        })
    }
}

export const verifiedUser = async(req:Request, res:Response): Promise<void> =>{
    const {email, code}= req.body
    try {
        const usuario= await Usuario.findOne({email})
        if (!usuario) {
            res.status(400).json({
                msj:" No se encontro email en la base de datos"
            })
            return
        }
        if(usuario.verified){
            res.status(400).json({
                msj: "El usuario está correctamente verificado"
            })
            return
        }
        if(usuario.code !== code){
            res.status(401).json({
                msj: "El código ingresado es incorrecto"
            })
            return
        }
        const updatedUser = await Usuario.findOneAndUpdate({email}, {verified:true})
        res.status(200).json({
            msj: "Usuario verificado exitosamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msj: "Error en el servidor"
        })
    }
}
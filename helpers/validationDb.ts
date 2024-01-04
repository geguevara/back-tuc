import { sendEmail } from "../mailer/mailer";
import Usuario, {IUser} from "../models/usuario";

export const existeEmail = async(email:string):Promise<void> =>{
    const existeEmail: IUser | null =await Usuario.findOne({email})
    if(existeEmail && existeEmail.verified){
        throw new Error (`El correo ${email} ya fue registrado`)
    }
    if(existeEmail && !existeEmail.verified){
        await sendEmail (email, existeEmail.code as string)
        throw new Error (`El usuario fue registrado. Se envió el codigo de verificacion al ${email}.`)
    }
}
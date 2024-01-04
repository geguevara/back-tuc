import nodemailer from "nodemailer"

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"tucumaneada.no.reply@gmail.com",
        pass:"cjhbypmbpysaqsvp"
    },
    from:"tucumaneada.no.reply@gmail.com"
});
export const sendEmail= async (to:string, code: string) :Promise<void>=> {
    try {
        const mailDescription ={
            form: " 'La Tucumaneada' tucumaneada.no.reply@gmail.com",
            to,
            subject:'Código de verificación',
            text:`Tu código de verificación de La Tucumaneada es:    ${code}`
        }
        await transporter.sendMail(mailDescription);
        console.log('Correo electrónico enviado')

    } catch (error) {
        console.log('Error al enviar el email de verificación');
    }
}
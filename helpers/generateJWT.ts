import jwt from "jsonwebtoken";

const generateJWT = (id:string="") :Promise<string> =>{
    return new Promise ((res, rej)=>{
        const payload= {id}
        jwt.sign( 
            payload, 
            process.env.SECRETPASS as string,
            {
                expiresIn: "12h"
            },
            (err:Error | null, token: string | undefined)=>{
                if(err){
                    console.log(err)
                    rej("No fue posible generar un token")
                }else{
                    res(token as string)
                }
            }
        )
    })
}
export default generateJWT;
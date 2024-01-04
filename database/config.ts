import mongoose from "mongoose";

export const conectarDB = async() :Promise<void> => {
    try {
        const URL = process.env.DB_URL;
        if(!URL){
            throw new Error('La url no esta definida en los .env')
        }

        await mongoose.connect(URL)
        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error ("Error al iniciar DB")
    }
} 
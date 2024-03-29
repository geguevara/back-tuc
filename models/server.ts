import express, { Express } from 'express';
import cors from 'cors';
import { conectarDB } from '../database/config';
import authRoutes from "../routes/auth"
import ordersRoutes from "../routes/orders"
import issuesRoutes from "../routes/issues"

export class Server{
    app: Express;
    port: string | number | undefined;
    authPath: string;
    ordersPath: string;
    issuesPath: string;

    constructor(){
        this.app= express();
        this.port= process.env.PORT
        this.authPath= '/auth'
        this.ordersPath = "/orders"
        this.issuesPath = "/issues"

        this.conectionDB()
        this.middlewares()
        this.routes()
    }

    async conectionDB(): Promise<void> {
        await conectarDB()
    }
    middlewares():void {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes():void{
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes);
        this.app.use(this.issuesPath, issuesRoutes);
    }
    listen():void{
        this.app.listen( this.port, ()=>{
            console.log(`Corriendo en el puerto ${this.port}`)   
        })
    }
}
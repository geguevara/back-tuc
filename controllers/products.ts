//
//
// ARMADO DE LA BASE DE DATOS DE LOS PRODUCTOS
//(SI SOBRA TIEMPO)
//
//

import { Request, Response } from "express";
import Producto, { IProduct } from "../models/products";
import { ObjectId } from "mongoose";

export const getOrders =async (req:Request, res: Response): Promise<void> => {
    const itemId: ObjectId = req.body.prodConf._id;

    const consultProd = { user: itemId }

    const orders = await Producto.find(consultProd)

    res.json({
        data: [...orders]
    })
}

export const createOrder = async(req:Request, res: Response): Promise<void> => {

    const orderData: IProduct = req.body

    const data = {
        ...orderData,
        createdAt: new Date(),
        status: "pending"
    }

    const producto = new Producto(data)

    await producto.save();

    res.status(201).json({
        producto
    })
}
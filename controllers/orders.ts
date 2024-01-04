import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { ObjectId } from "mongoose";

export const getOrders =async (req:Request, res: Response): Promise<void> => {
    const usuarioId: ObjectId = req.body.userConfirm._id;

    const consultUser = { user: usuarioId }

    const orders = await Order.find(consultUser)

    res.json({
        data: [...orders]
    })
}

export const createOrder = async(req:Request, res: Response): Promise<void> => {
    const usuario: ObjectId = req.body.userConfirm._id

    const orderData: IOrder = req.body

    const data = {
        ...orderData,
        user: usuario,
        createdAt: new Date(),
        status: "pending"
    }

    const order = new Order(data)

    await order.save();

    res.status(201).json({
        order
    })
}
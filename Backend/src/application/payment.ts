import { Request,Response,NextFunction } from "express";
import Order from "../infrastructure/schemas/Order";


export const handleWebhook = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {type, data} = req.body
        if(type ==="Successed"){
            await Order.findByIdAndUpdate( data.orderId, {paymentStatus: "PAID"})
            res.status(201).send()
        }
        res.status(200).send()
        return;
    } catch (error) {
        
    }
}
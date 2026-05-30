import express from 'express';
import { createOrder, getOrder, getOrders, getOrdersByUser, updateOrder } from '../application/orders';
import { isAuthenticated } from './middleware/authentication-middleware';

export const orderRouter = express.Router();

orderRouter.route('/').post(isAuthenticated,createOrder).get(isAuthenticated,getOrders)
orderRouter.route('/:id').get(isAuthenticated,getOrder).all(isAuthenticated,updateOrder)
orderRouter.route('/user/:userId').get(getOrdersByUser)

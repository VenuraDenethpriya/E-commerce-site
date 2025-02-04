import express from 'express';
import { createOrder, getOrder } from '../application/orders';
import { isAuthenticated } from './middleware/authentication-middleware';

export const orderRouter = express.Router();

orderRouter.route('/').post(createOrder)
orderRouter.route('/:id').get(getOrder)

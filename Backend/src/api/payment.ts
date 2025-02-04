import express from 'express';
import { handleWebhook } from '../application/payment';

export const paymentRouter = express.Router();

paymentRouter.route('/webhook').post(handleWebhook)
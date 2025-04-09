import express from 'express';
import { createCheckoutSession, handleWebhook, retrieveSessionStatus } from '../application/payment';

export const paymentRouter = express.Router();

paymentRouter.route('/webhook').post(handleWebhook)
paymentRouter.route('/create-checkout-session').post(createCheckoutSession)
paymentRouter.route('/session-status').get(retrieveSessionStatus)

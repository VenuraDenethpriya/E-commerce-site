import express from 'express';

import 'dotenv/config';
const app = express();
import { productRouter } from './api/product';
import globalErrorHanlingMiddleware from './api/middleware/global-error-handling-middleware';
import { categoryRouter } from './api/category';
import { connectDB } from './infrastructure/db';
import cors from 'cors';
import { orderRouter } from './api/order';
import { clerkMiddleware } from '@clerk/express';
import { paymentRouter } from './api/payment';

const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.VITE_CLERK_SECRET_KEY

app.use(express.json());
app.use(clerkMiddleware({
    publishableKey,
    secretKey,
}));

app.use(cors({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
    console.log('Request success');
    console.log(req.method, req.url);
    next();
})

app.use('/api/products',productRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payments', paymentRouter)
app.use(globalErrorHanlingMiddleware as any);

connectDB();
app.listen(8000, ()=> console.log(`Server running on port ${8000}`));

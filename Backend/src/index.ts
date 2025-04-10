import express from 'express';
import 'dotenv/config';
import { productRouter } from './api/product';
import globalErrorHanlingMiddleware from './api/middleware/global-error-handling-middleware';
import { categoryRouter } from './api/category';
import { connectDB } from './infrastructure/db';
import cors from 'cors';
import { orderRouter } from './api/order';
import { clerkMiddleware } from '@clerk/express';
import { paymentRouter } from './api/payment';
import { userRouter } from './api/user';
import { handleWebhook } from './application/payment';
import bodyParser from 'body-parser';

const app = express();

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY

app.use(clerkMiddleware({
    publishableKey,
    secretKey,
}));

app.use(cors({ origin: 'https://mebius-venura-denethpriyas-projects.vercel.app', credentials: true}));

app.post(
    '/api/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }),
    handleWebhook
);

app.use(express.json());


app.use((req, res, next) => {
    console.log('Request success');
    console.log(req.method, req.url);
    next();
})

app.use('/api/products',productRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/users', userRouter)

app.use(globalErrorHanlingMiddleware as any);

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

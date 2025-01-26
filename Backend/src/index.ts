import express from 'express';

import 'dotenv/config';
const app = express();
import { productRouter } from './api/product';
import globalErrorHanlingMiddleware from './api/middleware/global-error-handling-middleware';
import { categoryRouter } from './api/category';
import { connectDB } from './infrastructure/db';
import cors from 'cors';

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
    console.log('Request success');
    console.log(req.method, req.url);
    next();
})

app.use('/api/products',productRouter)
app.use('/api/categories',categoryRouter)
app.use(globalErrorHanlingMiddleware as any);

connectDB();
app.listen(8000, ()=> console.log(`Server running on port ${8000}`));

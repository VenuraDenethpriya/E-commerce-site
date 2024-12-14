import express from 'express';

import 'dotenv/config';
const app = express();
import { productRouter } from './api/product.js';
import globalErrorHanlingMiddleware from './api/middleware/global-error-handling-middleware.js';
import { categoryRouter } from './api/category.js';
import { connectDB } from './api/infrastructure/db.js';

app.use(express.json());

app.use((req, res, next) => {
    console.log('Request success');
    console.log(req.method, req.url);
    next();
})

app.use('/api/products',productRouter)
app.use('/api/category',categoryRouter)
app.use(globalErrorHanlingMiddleware)

connectDB();
app.listen(8000, ()=> console.log(`Server running on port ${8000}`));

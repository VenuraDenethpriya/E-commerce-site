import express from "express";
import { 
    createCategory, 
    deleteCategory, 
    getCategories, 
    getCategory, 
    updateCategory 
} from "../application/categories.js";
import { asyncHandler } from "../utils.js";
import { isAuthenticated } from "./middleware/authentication-middleware.js";
import { isAdmin } from "./middleware/authorization-middleware.js";

export const categoryRouter = express.Router();

categoryRouter
    .route('/')
    .get(asyncHandler(getCategories))
    .post(isAuthenticated, isAdmin,(asyncHandler(createCategory)));

categoryRouter
    .route('/:id')
    .get(asyncHandler(getCategory))
    .delete(isAuthenticated, isAdmin,(asyncHandler(deleteCategory)))
    .patch(isAuthenticated, isAdmin,(asyncHandler(updateCategory)));
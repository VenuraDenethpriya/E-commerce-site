import express from "express";
import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../application/products.js";
import { asyncHandler } from "../utils.js";
import { isAuthenticated } from "./middleware/authentication-middleware.js";
import { isAdmin } from "./middleware/authorization-middleware.js";

export const productRouter = express.Router();

productRouter
    .route("/")
    .get(asyncHandler(getProducts))
    .post(isAuthenticated, isAdmin,(asyncHandler(createProducts)));


productRouter
  .route("/:id")
  .get(asyncHandler(getProduct))
  .delete(isAuthenticated, isAdmin,(asyncHandler(deleteProduct)))
  .patch(asyncHandler(updateProduct));

import express from "express";
import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../application/products";
import { asyncHandler } from "../utils";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

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

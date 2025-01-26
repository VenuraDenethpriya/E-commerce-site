import express from "express";
import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../application/products";
import { asyncHandler } from "../utils";

export const productRouter = express.Router();

productRouter
    .route("/")
    .get(asyncHandler(getProducts))
    .post(asyncHandler(createProducts));


productRouter
  .route("/:id")
  .get(asyncHandler(getProduct))
  .delete(asyncHandler(deleteProduct))
  .patch(asyncHandler(updateProduct));

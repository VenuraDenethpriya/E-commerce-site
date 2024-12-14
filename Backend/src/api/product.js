import express from "express";
import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../application/products.js";

export const productRouter = express.Router();

productRouter
    .route("/")
    .get(getProducts)
    .post(createProducts);


productRouter
  .route("/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

import { ProductDTO } from "../domain/dto/product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Product from "../infrastructure/schemas/Product";
import { Request, Response, NextFunction } from "express";

export const getProducts = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId){
      const products = await Product.find();
      return res.status(200).json(products)
    }
    
    const products = await Product.find({ categoryId });
    return res.status(200).json(products).send()
    
  } catch (error) {
    next(error);
  }
}
export const createProducts = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = ProductDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError("Invalid product data");
        }
    await Product.create(result.data);
    return res.status(201).send("successfully created")
  } catch (error) {
    next(error);
  }
}

export const getProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id).populate("categoryId");

    if(!product){
      throw new NotFoundError("Product not found ")
    }
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      throw new NotFoundError("Product not found ")
    }

    return res.status(201).json(product).send()
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id; 
    const product = await Product.findByIdAndUpdate(id, req.body);

    if(!product){
      throw new NotFoundError("Product not found")
    }

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}
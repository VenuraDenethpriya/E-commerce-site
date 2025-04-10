import Stripe from "stripe";
import { ProductDTO } from "../domain/dto/product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Product from "../infrastructure/schemas/Product";
import { Request, Response, NextFunction } from "express";
import stripe from "../infrastructure/stripe";

export const getProducts = async (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId){
      const products = await Product.find();
      res.status(200).json(products)
      return;
    }
    
    const products = await Product.find({ categoryId });
    res.status(200).json(products).send()
    return;
  } catch (error) {
    next(error);
  }
}
export const createProducts = async (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  try {
    const result = ProductDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError("Invalid product data");
        }
    
    const stripeProduct = await stripe.products.create({
      name: result.data.name,
      description: result.data.description,
      default_price_data: {
        currency: "lkr",
        unit_amount: result.data.price * 100,
      },
    })

    const product = await Product.create({
      ...result.data,
      stripePriceId: stripeProduct.default_price,
    });
    res.status(201).json(product).send("successfully created")
    return;
  } catch (error) {
    next(error);
  }
}

export const getProduct = async (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id).populate("categoryId");

    if(!product){
      throw new NotFoundError("Product not found ")
    }
    res.status(201).json(product).send();
    return;
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  try {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      throw new NotFoundError("Product not found ")
    }

    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  try {
    const id = req.params.id; 
    const product = await Product.findByIdAndUpdate(id, req.body);

    if(!product){
      throw new NotFoundError("Product not found")
    }

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
}
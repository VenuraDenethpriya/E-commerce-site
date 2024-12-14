import NotFoundError from "../domain/errors/not-found-error.js";
import Product from "./schemas/Product.js";


export const getProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId){
      const products = await Product.find();
      return res.status(200).json(products).send()
    }
    
    const products = await Product.find({ categoryId });
    return res.status(200).json(products).send()
    
  } catch (error) {
    next(error);
  }
}
export const createProducts = async (req, res, next) => {
  try {
    await Product.create(req.body);
    return res.status(201).send("successfully created")
  } catch (error) {
    next(error);
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id).populate("categoryId");

    if(!product){
      throw new NotFoundError("Product not found ")
    }
    return res.status(201).json(product).send();
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req, res, next) => {
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

export const updateProduct = async (req, res, next) => {
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
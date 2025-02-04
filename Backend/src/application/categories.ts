import { CategoryDTO } from "../domain/dto/category";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Category from "../infrastructure/schemas/Category";
import { Request, Response, NextFunction } from "express";

export const getCategories = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const categories = await Category.find();
        return res
            .status(200)
            .json(categories)
    } catch (error) {
        next(error);
    }
}

export const createCategory = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const result = CategoryDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError("Invalid category data");
        }
        await Category.create(result.data);
        return res
            .status(201)
            .send()
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id)
        
        if (!category) {
            throw new NotFoundError("Category not found")
        }
        return res
            .status(200)
            .json(category)
            .send();
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id)
        
        if (!category) {
            throw new NotFoundError("Category not found")
        }
        
        return res
            .status(200)
            .json(category)
            .send();
    } catch (error) {
        
    }
}

export const updateCategory = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
        const category = await Category.findByIdAndUpdate(id, req.body)
        
        if(!category){
            throw new NotFoundError("Category not found")
        }
        
        return res
                .status(200)
                .json(category)
                .send();
    } catch (error) {
        
    }
}
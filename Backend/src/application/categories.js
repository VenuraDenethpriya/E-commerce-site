import NotFoundError from "../domain/errors/not-found-error.js";
import Category from "./schemas/Category.js";


export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res
            .status(200)
            .json(categories)
            .send();
    } catch (error) {
        next(error);
    }
}

export const createCategory = async(req, res, next) => {
    try {
        const category = await Category.create(req.body)
        return res
            .status(201)
            .json(category)
            .send()
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req, res, next) => {
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

export const deleteCategory = async (req, res, next) => {
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

export const updateCategory = async (req, res, next) => {
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
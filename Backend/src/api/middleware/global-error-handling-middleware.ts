import { Request, Response, NextFunction } from "express";

const globalErrorHanlingMiddleware = (error:Error, req:Request, res:Response, next:NextFunction) => {
    console.log(error);
    if(error.name === "NotFoundError"){
        return res
            .status(404)
            .json({
                message: error.message,
            })
            .send();
    }else if(error.name === "ValidationError"){
        return res
            .status(400)
            .json({
                message: error.message,
            })
            .send();
    }
    else if (error.name === "UnauthorizedError") {
        res
          .status(401)
          .json({
            message: error.message,
          })
          .send();
        return;
      } else {
        res
          .status(500)
          .json({
            message: error.message,
          })
          .send();
        return;
      }
    };
    
export default globalErrorHanlingMiddleware;
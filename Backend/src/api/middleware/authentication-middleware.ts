import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    throw new UnauthorizedError("Unauthorized");
  }
  next();
};
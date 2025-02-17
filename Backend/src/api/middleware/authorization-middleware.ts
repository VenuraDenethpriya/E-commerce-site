import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";
import { getAuth } from "@clerk/express";

interface SessionClaims {
  metadata?: {
    role?: string;
  };
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  const sessionClaims = auth.sessionClaims as SessionClaims; 

  if (sessionClaims.metadata?.role !== "admin") {
    throw new ForbiddenError("Forbidden");
  }
  next();
};
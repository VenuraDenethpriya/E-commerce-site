/*import { clerkClient } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

export const getUsers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const users = await clerkClient.users.getUserList();
        res.status(200).json(users);
        return;
    } catch (error) {
        next(error);
    }
}
*/
import { Request, Response, NextFunction } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await clerkClient.users.getUser(userId);

        if (user.publicMetadata.role !== "admin") {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const users = await clerkClient.users.getUserList();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

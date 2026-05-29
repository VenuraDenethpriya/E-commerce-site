import express from 'express';
import { getUsers } from '../application/users.js';
import { asyncHandler } from '../utils.js';

export const userRouter = express.Router();

userRouter.route('/').get(asyncHandler(getUsers))
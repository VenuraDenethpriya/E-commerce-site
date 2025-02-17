import express from 'express';
import { getUsers } from '../application/users';
import { asyncHandler } from '../utils';

export const userRouter = express.Router();

userRouter.route('/').get(asyncHandler(getUsers))
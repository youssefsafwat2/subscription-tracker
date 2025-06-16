import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import { authorize, authorizeAdmin } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));
userRouter.get('/', authorizeAdmin, getUsers);
userRouter.get('/:id', authorizeAdmin, getUser);
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE users' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }));

export default userRouter;

import { Router } from "express";


const userRouter = Router();

userRouter.post('/',(req,res)=>res.send({title: "CREATE new user"}));
userRouter.get('/',(req,res)=>res.send({title: "GET all users"}));
userRouter.get('/:id',(req,res)=>res.send({title: "GET user by id"}));
userRouter.put('/:id',(req,res)=>res.send({title: "UPDATE users"}));
userRouter.delete('/:id',(req,res)=>res.send({title: "DELETE user"}));


export default userRouter;
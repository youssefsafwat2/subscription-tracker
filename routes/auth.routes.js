import { Router } from "express";


const authRouter = Router();


authRouter.post('/sign-up',(req,res)=>{ res.send({message:"Sign up"})})

authRouter.post('/sign-in',(req,res)=>{ res.send({message:"Sign in"})})

authRouter.post('/sign-out',(req,res)=>{ res.send({message:"Sign out"})})



export default authRouter;
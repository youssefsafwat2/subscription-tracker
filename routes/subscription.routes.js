import { Router } from "express";


const subscriptionRouter = Router();



subscriptionRouter.get('/',(req,res)=>res.send({title:"GET all subscriptions"}));

subscriptionRouter.get('/:id',(req,res)=>res.send({title:"GET subscription by id"}));

subscriptionRouter.put('/:id',(req,res)=>res.send({title:"UPDATE subscription"}));

subscriptionRouter.post('/',(req,res)=>res.send({title:"CREATE subscription"}));

subscriptionRouter.delete('/:id',(req,res)=>res.send({title:"DELETE subscription"}));

subscriptionRouter.get('/:id',(req,res)=>res.send({title:"GET all user subscriptions"}));

subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:"GET subscription by id"}));
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:"CANCEL subscription"}));
subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({title:"GET all upcoming renewals"}));


export default subscriptionRouter;
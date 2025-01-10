const express=require('express');
const router=express.Router();
require("dotenv").config();
const stripe=require("stripe")(process.env.SECRET_STRIPE_KEY)

router.post('/checkout',async (req,res)=>{
    console.log("hello");
    
    try {
        
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items:req.body.items.map(item=>{
                
                return {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:item.name
                        },
                        unit_amount:(item.price)*100,
                    },
                  
                    quantity:item.quantity
                }
               
               
            }),
           
            success_url:"http://localhost:5173/success",
            cancel_url:"http://localhost:5173/cancel"

        })
        
        res.json({url:session.url})
    } catch (error) {
        console.log("can not pay");
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
})
module.exports=router;
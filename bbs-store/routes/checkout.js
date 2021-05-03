const express = require('express');
const date = require('date-and-time');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/orders');
const Address = require('../models/adress');

router.get('',(req,res)=>{

        if(req.session.isLoggedIn){



                const user_id = req.session.userid;
               
                Cart.fetchCart(user_id)
                .then(result => {
                        const Carts = result[0];
                        res.render('checkout',{
                                title:"Checkout",
                                sess : req.session,
                                carts : Carts
                                
                        });
                })
                }
                else{
                        res.redirect('login');
                }
       

});

router.get('/payment',(req,res)=>{

        if(req.session.isLoggedIn){

                const user_id = req.session.userid;
               
                
                        
                        res.render('payment',{
                                title:"Payment",
                                sess : req.session          
                        });
                }
                else{
                        res.redirect('login');
                }
       

});


router.post('',(req,res)=>{

        var curday = function(sp){
                today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                
                if(dd<10) dd='0'+dd;
                if(mm<10) mm='0'+mm;
                return (mm+sp+dd+sp+yyyy);
                };
                var date = curday('/');
        if(req.session.isLoggedIn){
                const user_id = req.session.userid;

                const h_add = req.body.address;
                const city = req.body.city;
                const state = req.body.state;
                const country = req.body.country;
                const pincode = req.body.zipcode;

                Cart.fetchCart(user_id)
                .then(result => {
                        const Carts = result[0];
                        var len = Carts.length;
                        var i;
                        
                                

                                for (i = 0; i < len; i++) {
                                         Product.Update(result[0][i].quantity, result[0][i].p_id);
                                         Order.Update(result[0][i].o_id);
                                         const shipping = new Address(user_id, h_add, city, state, country, pincode, date, result[0][i].o_id);
                                          shipping.save();
                                                       
                                }
                        res.redirect('/checkout/payment');  
                })

        }
        else{
                res.redirect('login');   
        }
       
         
      })
      

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Product = require('../models/product');


router.get('',(req,res)=>{

    var orders
    Product.fetchAll()
        .then(result => {
                const products = result[0];
                Order.getAllOrders()
                    .then(result =>{
                        orders = result[0];
                        res.render('admin',{title:"Admin",sess : req.session, orders: orders, products});
                    
                    })
                        .catch(err => {
                                console.log(err);
                        })
                
        })
    
        
        
        

});

router.post('',(req,res)=>{
    if(req.session.isLoggedIn){
            const p_id = req.body.productId*1;
            console.log(p_id);
            Product.deleteById(p_id)
            .then( result =>{
                    res.redirect('/admin')
            })
    }
})




module.exports = router;
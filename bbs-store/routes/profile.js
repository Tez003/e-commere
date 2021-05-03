const express = require('express');
const router  = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/orders');
const Address = require('../models/adress');


router.get('', (req,res) => {

    if(req.session.isLoggedIn){
    var orders;
    var pending_orders;
    var dispatchables;

    Order.getDispatcable(req.session.userid)
    .then (result => {
        dispatchables = result[0];
        console.log(dispatchables);
    Order.getPreviousOrders(req.session.userid)
    .then (result =>{
        orders = result[0];
        Order.getPendingOrders(req.session.userid)
        .then(result =>{
            pending_orders = result[0];
            Product.getBySeller(req.session.userid)
                .then( result => {
                    addedproducts = result[0];
                    return res.render('profile',{title:"Profile", sess: req.session,useraddedproducts : addedproducts, orders: orders, pending_orders: pending_orders, dispatchables});
                })
                .catch( err => {
                    console.log(err);
                });
        });
    });
});
    
   


    
}

    else{
        res.redirect('login')
    }
    
});



router.post('',(req,res)=>{
    if(req.session.isLoggedIn){
        Order.getDispatcable(req.session.userid)
                .then(result => {
                        const Carts = result[0];
                        var len = Carts.length;
                        var i;
                                for (i = 0; i < len; i++) {
                                         console.log(result[0][i].o_id);
                                         Order.dispatchUpdate(result[0][i].o_id);
                                }
                        res.redirect('/profile');  
                })
    }

    else{
        res.redirect('/login');
    }

});


module.exports = router;
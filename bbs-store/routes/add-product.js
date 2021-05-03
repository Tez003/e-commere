const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('',(req,res)=>{
        
        res.render('add-product',{title:"Add Product",sess : req.session});

});

router.post('',(req,res)=>{

        /*if(!req.session.isLoggedIn){
                res.redirect("/login")
         }*/
        
         const productName = req.body.productName;
         const price = req.body.Price;
         const description = req.body.Descp;
         const imageUrl = req.body.imageUrl;
         const Category = req.body.Category;
         const seller_id = req.session.userid
         const quant = req.body.quant;
         console.log(quant);

         const product = new Product(productName, imageUrl, description, Category,quant, seller_id, price);
         product.save()
         .then(result => {
                 res.redirect("/");
         })
      })

module.exports = router;
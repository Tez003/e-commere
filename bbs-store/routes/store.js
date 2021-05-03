const express = require('express');
const date = require('date-and-time');
const router = express.Router();
const Product = require('../models/product');

router.get('',(req,res)=>{

        

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
        console.log(date);


        
        Product.fetchAll()
        .then(result => {
                const products = result[0];
                const extra = result[1];
                res.render('store',{
                        title:"Home",
                        products : products,
                        sess : req.session
                        });
        })
        .catch(err => {
                console.log(err);
        })
        
       
        

});

router.post('', (req, res)=>{
        const category = req.body.Category;

        if(category == "Search"){
                res.redirect('/')
        }
        else{
        res.redirect('/categ/'+category);
        }
})

router.get('/categ/:category', (req, res) =>{
        const category = req.params.category;
       
        Product.findByCategory(category)
        .then(result => {
                const products = result[0];
                res.render('store',{
                        title:"Home",
                        products : products,
                        sess : req.session
                        });
        })
        .catch(err => {
                console.log(err);
        })


})


router.get('/:p_id',(req,res)=>{
        const prodId = req.params.p_id;
        Product.findById(prodId)
        .then(result => {
                const products = result[0];
                const extra = result[1];
                res.render('product',{
                        title:"View Product",
                        products : products,
                        sess : req.session
                        });
                })
        .catch(err => {
                        console.log(err);
                })
        
})

module.exports = router;
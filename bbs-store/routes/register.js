const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('',(req,res)=>{
        res.render('register',{title:"register",sess : req.session});

});

router.post('',(req,res)=>{
  
  const name = req.body.fname;
  const username = req.body.Username;
  const mob_no = req.body.Phno;
  const email = req.body.Email;
  const pass = req.body.Password;
  const confirmPassword = req.body.conPassword;
  
  User.findByEmail( email )
    .then(result => {
      if (result[0].length != 0) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('/register');
      }
     
        const user = new User(name,username,email,mob_no,pass);
        return user.save()
        .then(result => {
          res.redirect('login');
        });
    })
    .catch(err => {
      console.log(err);
    });
   
})

module.exports = router;
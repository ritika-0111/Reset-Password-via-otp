var express = require('express');
var router = express.Router();
var db = require('../module/db');
var bodyParser = require('body-parser');
const sendSMS = require('../module/sms.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const cryptoRandomString = require('crypto-random-string');
global.secureRoute = cryptoRandomString({ length: 16, type: 'url-safe'})


router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

router.post('/log', function (req, res, next) {
  let post ={
   password : req.body.password,
   email : req.body.email};
  let sql= 'SELECT * FROM user WHERE email = ?';
  db.query(sql, post.email, (err, result) => {
    if(err) throw err;
    console.log("You",result);
    if(post.password == result[0].password){
        res.render('dashboard');
    }else{
        res.send("Please try again.")
      };

       
      });
    });


// GET registration page

// POST registration details
router.post('/sub', function(req, res, next) {  
    let post = {
      name:''+ req.body.name +'',
      username:''+ req.body.username +'',
      email:''+ req.body.email +'',
      mobile:''+ req.body.mobno +'',
      password:''+ req.body.password +''
    };
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        return result;
    });

    res.redirect('/');
});


//reset password page
router.get('/forgot', function (req, res) {
    res.render('forgot');
  });
  
  //get data from forgot password email and send otp 
  router.post('/forgot', function (req, res) {
    let mobile= req.body.mobno;
    db.query('select otp from user where mobile = ?', mobile, (err, result) => {
      if (err) throw err;
      else {  
        let otp = Math.floor(100000 + Math.random() * 900000);
        db.query('UPDATE user SET otp = ? where mobile = ?', [otp, mobile], (err, result) => {
          if (err) throw err;
        });
        global.userData = {
          'otp': otp,
          'mobile':mobile
        };
        var body = "Use "+ otp +" as one time password(OTP) to reset your password";
        var to = "+91"+mobile;
        sendSMS.send(body,to);
        return res.redirect('/verify-otp');
      };
    });
  });
  
  //OTP Verification
  router.get('/verify-otp', (req, res) => {
  res.render('verifyotp');
  });
  
  router.post('/verify-otp', (req, res) => {
  if (req.body.otp == userData.otp) {
    return res.redirect('/forgot/' + secureRoute);
  }
  else {
    return res.redirect('/forgot');
  }
  });
  
  // reset-password
  router.get('/forgot/' + secureRoute, function (req, res) {
    res.render('reset', { secrete: secureRoute }) 
  });
  
  router.post('/forgot/' + secureRoute, (req, res) => {
    const pass = req.body.password;
    db.query('UPDATE user SET password = ? where mobile = ?',[pass, userData.mobile], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

module.exports = router;
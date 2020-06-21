var db = require('../db');
var md5 = require('md5');

module.exports.postLogin = function(req,res,next){
    var email = req.body.email;
    var password = req.body.pass;
    var hasdPass = md5(password);
    var user = db.get('users').find({email: email}).value();
    if(!user){
        res.render('auth/login',{errors:["user doesn't exists"]});
        return;
    }
    if(hasdPass!==user.pass){
        res.render('auth/login',{errors:["Wrong password!!!"]});
        return;
    }

    res.cookie("user",user.id);
    next();
}
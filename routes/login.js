var express = require('express');
var router = express.Router();
var Userdb = require('../models/user.models');
var mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('debug');
/* GET users listing. */
router.post('/', async (req, res, next)=>{
  let userData=req.body
 var user = await Userdb.findOne({Phonenumber:userData.Phonenumber})
      
          if(!user){
            return res.status(401).send('Invalid Phone')
          }
          else if(!await bcrypt.compare(userData.password,user.password)){
          return  res.status(401).send('Invalid Password')
          }
          else{
            const token = jwt.sign({id:user._id},"secret");
            res.cookie('jwt', token,{
              httpOnly: true,
              maxAge: 60 * 60 * 24 *1000
            })
            return res.status(200).send(JSON.stringify({token:token}))
          }
    });   
 
module.exports = router;
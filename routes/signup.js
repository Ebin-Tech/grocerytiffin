var express = require('express');
var router = express.Router();
var Userdb = require('../models/user.models');
var mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const { log } = require('debug');

router.post('/', async (req, res, next) =>{
  let userData=req.body
   const salt = await bcrypt.genSalt(10);
   const hashpassword = await bcrypt.hash(userData.password, salt);
  let newUser= new Userdb({
    firstName:userData.firstName,
        lastName:userData.lastName,
        email:userData.email,
        password:hashpassword,
        Phonenumber:userData.Phonenumber,
        Address:userData.Address,
        Address2:userData.Address2,
        City:userData.City,
        Province:userData.Province,
        Zip:userData.Zip
  })

   const result = await newUser.save()

  const {password, ...data} = await result.toJSON();
  res.status(200).send(data);
});

module.exports = router;

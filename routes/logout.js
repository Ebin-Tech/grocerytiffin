var express = require('express');
var router = express.Router();
var Userdb = require('../models/user.models');
var mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('debug');
/* GET users listing. */
router.post('/',async(req,res)=>{
res.cookie('jwt','',{maxAge:0})
res.send({
    message: 'Success'
})
}) 
 
module.exports = router;
var express = require('express');
var router = express.Router();
var Userdb = require('../models/user.models');
var mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('debug');
/* GET users listing. */
router.get('/',async (req,res,next) => {
    
    const cookie = req.cookies['jwt']
     const claims=jwt.verify(cookie,'secret');
    if(!claims){
        return res.status(401).send({
            message: 'unauthorised'
        })
    }
     const user =  await Userdb.findOne({id: claims._id})
     const {password, ...data}= await user.toJSON()
 
res.send(data);
}) 
 
module.exports = router;
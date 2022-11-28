const express= require('express')
const route = express.Router()
const argon2 = require('argon2')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//@route POST api/auth/register
// @desc POST register
// @access Private
route.post('/register', async (req, res) =>{
    const {username, password} = req.body
    if(!username | !password)
    {return res.status(400).json({success: false, message:'missing user name or password'})}
    else {
        try{
            //check trong database da co user chua
            const user = await User.findOne({username: username}) //findone kia la tim xem trong db co username trung voi user name trong req.body hay khong
            if(user){
            return res.status(400).json({success: false, message:'da có user trong data'})
            } else{
            //all good
            //hash password su dung argon 2
            const hashPassword = await argon2.hash(password)
             const newUser = new User({
            username: username,
            password: hashPassword
        })
        await newUser.save()
        // return token
        const asscessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message: 'user creat OK', asscessToken})         
                     }
        }
      
        catch(error) {
            console.log(error);
        }
    }

})

//@route POST api/auth/login
// @desc POST post
// @access Private
route.post('/login', async (req, res) =>{
    const {username, password} = req.body
    if(!username | !password)
     return res.status(400).json({success: false, message:'you must login'})
    try {
        const user = await User.findOne({username: username})
        if(!user)
        res.status(400).json({success: false, message:'Khoong co user trong db'})
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
        res.status(400).json({success: false, message:'nhap sai password'})
        const asscessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message: 'user login OK', asscessToken})   
        res.render(user)      
    } catch (error) {
        
    }


})


module.exports = route
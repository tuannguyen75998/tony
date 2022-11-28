const express = require('express')
const route = express.Router()
const Post = require('../models/post')
const verify = require('./middleware/auth')

// @route POST /api/post
route.post('/', verify,async (req, res) => {
    const {tilte, decription, url, status} = req.body
    if(!tilte)
    return res.status(400).json({success:false, message: 'you must fill tiltle'})
    try {
        const newPost = new Post({
            tilte : tilte,
            decription: decription,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || "to learn",
            userpost: req.userId
        })
        await newPost.save()
        res.json({success:true, message:'you post successfuly', baidang: newPost})
    } catch (error){ console.log(error);
        }

})
//@route GET api/auth/getpost
// @desc GET post
// @access Private
route.get('/getpost',verify, async (req, res) => {
    try {
        const allPost = await Post.find({userpost: req.userId}).populate('userpost','username')
        res.json({success: true, allPost})
    } catch (error) {
        console.log(error);
    }
   

})
//@route PUT api/post/update
// @desc update post
// @access Private
route.put('/:id', verify, async (req, res) => {
    const {tilte, decription, url, status} = req.body
    try {
        let postUpdate = {
            tilte: tilte,
            decription: decription || '',
            url: url.startsWith('http://') ? url : `http://${url}` || '',
            status: status || "to learn",
            userpost: req.userId
        }

        const postUpdateCondition = { _id: req.params.id, userpost: req.userId}
        const updatedPost = await Post.findOneAndUpdate(postUpdateCondition, postUpdate, {new: true})
        if(!updatedPost)
        return res.status(401).json({success:false, message:'update false'})
        res.json({success:true, message:'update successfully', postupdate: updatedPost})
    } catch (error) {
        console.log(error);
        
    }
    
})
// @route DELETW api/post/delete
// @desc delete post
// @access Private

route.delete('/:id', verify, async (req, res) =>{
    try {
        const postdeleteCondition = {_id: req.params.id, userpost: req.userId}
        const deletePost = await Post.findOneAndDelete(postdeleteCondition)
        if(!deletePost)
        return res.status(401).json({success:false, message:'delete false'})
        res.json({message:'you delete successfully', postdeleted: deletePost})
    } catch (error) {
        console.log(error);
    }
})


module.exports = route
const express = require('express');

const router = express.Router();

// MODELS
const db = require('../models');

//NEW COMMENT POST ROUTE
router.post('/', async (req, res, next) => {
    try{
      const createdComment = await db.Comment.create(req.body)
      console.log(`created comment is ${createdComment}`)
      res.redirect(`/tweets/${createdComment.tweet}`)
    } catch (error) {
      console.log(error)
      req.error = error
      return next()
    }
})

//DELETE COMMENT ROUTE
router.delete('/:commentId', async (req,res, next)=>{
  try{
      const deleteComment = await db.Comment.findByIdAndDelete(req.params.commentId)
      console.log(deleteComment) 
      res.redirect(`/tweets/${deleteComment.tweet}`)
  }catch(error){
      console.log(error);
      req.error = error;
      return next();
  }
})
module.exports = router
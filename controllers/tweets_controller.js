const express = require('express')

const router = express.Router()


const db = require('../models')


// NEW TWEET ROUTE

router.get('/new', (req, res) => {
    res.render('tweets/new.ejs')
})



//SHOW ROUTE

router.get('/:id', async (req, res, next) => {
    try {
        const foundTweet = await db.Tweet.findById(req.params.id)
        const foundComment = await db.Comment.find({tweet: req.params.id})
        .populate('username')

        const context = { 
            oneTweet: foundTweet,
            comments: foundComment,
        }
        console.log(foundComment)
        res.render('tweets/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});


// INDEX ROUTE

router.get('/', async (req, res, next) => {
    try {
        const tweets = await db.Tweet.find({});
        const foundUsers = req.query
        const allUsers = await db.User.find({})
        const context = {
            tweets: tweets,
            userSearch: foundUsers,
            allUsers: allUsers
        }
        return res.render('tweets/index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});



//NEW TWEET POST ROUTE

router.post('/', async (req, res, next) => {
  try{
    console.log(req.body)
    const createdTweet = await db.Tweet.create(req.body)
    console.log(`created tweet is ${createdTweet}`)
    res.redirect('/tweets')
  } catch (error) {
    console.log(error)
    req.error = error
    return next()
  }
})

//LIKES ROUTE

router.put('/likes', async (req, res, next) => {
    try{
        const body = req.body
        const likes = await body.likes
        const id = body._id
        console.log('likes are ')
        console.log(req.body)
        const thisTweet = await db.Tweet.findById(id)
        thisTweet.likes.push(body.likes)
        await thisTweet.save()
        console.log(thisTweet)
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        req.error = error
        return next()
    }
})


//DELETE ROUTE

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedTweet = await db.Tweet.findByIdAndDelete(req.params.id);

        console.log(deletedTweet);
        res.redirect('/tweets');
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})




module.exports = router
const express = require('express')

const router = express.Router()


const db = require('../models')


router.get('/', (req, res) => {
    res.send('account page')
})


// INDEX ROUTE

router.get('/:id', async (req, res, next) => {
    try {
        const user = await db.User.findById({_id: req.params.id})
        const tweets = await db.Tweet.find({});
        const context = { tweets: tweets, foundUser: user }
        console.log(tweets)
        return res.render('./tweets/account.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});


module.exports = router
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Make a comment']
    },
    image: {
        type: String,
    },
    username: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: String
    },  

    likes: [{type: mongoose.Types.ObjectId}]
} , { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
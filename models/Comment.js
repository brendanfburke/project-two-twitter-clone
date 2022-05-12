const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: String
    },
    comment: {
        type: String,
    },
    tweet: {
        type: mongoose.Types.ObjectId,
        ref: 'Tweet'
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
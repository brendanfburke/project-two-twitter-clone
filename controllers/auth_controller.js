const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

router.get('/register', (req, res) => {
    return res.render('./auth/register.ejs')
})

router.get('/login', (req, res) => {
    res.render('./auth/login.ejs')
})

router.post('/register', async (req, res, next) => {
    try {
        const foundUser = await User.exists({username: req.body.username})
        if (foundUser) {
            console.log(`You already have an account`)
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(12);
        console.log(salt);
        const hash = await bcrypt.hash(req.body.password, salt);
        console.log(hash);
        req.body.password = hash;

        const newUser = await User.create(req.body);

        return res.redirect('/login')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.post("/login", async function (req, res) {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        console.log(foundUser);

        if (!foundUser) return res.send("The password or the username is invalid");
        
        const match = await bcrypt.compare(req.body.password, foundUser.password);
    
        if (!match) return res.send("The password or the username is invalid");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };

        console.log(req.session);
    
        return res.redirect("/tweets");
    } catch (err) {
        console.log(err);
        req.err = err;
        res.send(err);
    }
});

router.get("/logout", async (req, res) => {
    try {
        await req.session.destroy();
        console.log(req.session);
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

module.exports = router;

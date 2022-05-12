const express = require('express');
const methodOveride = require('method-override')
const controllers = require('./controllers')
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo')
const navLinks = require('./navLinks');
const { account } = require('./controllers');




require('./config/db.connection')

const PORT = process.env.PORT

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(methodOveride('_method'))

app.use(express.urlencoded({ extended: false }))

app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, 
        },
    })
    );
    
    /* SECTION Middleware */
app.use(navLinks);
app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
  });

app.use ('/tweets', controllers.tweets)
app.use ('/comments', controllers.comments)
app.use ('/', controllers.auth)
app.use ('/account', controllers.account)



app.get('/', (request, response) => response.redirect('/login'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

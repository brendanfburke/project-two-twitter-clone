const routes = [
    { href: "/tweets", title: "Home" },
    { href: "/tweets/new", title: "New Tweet" },
    { href: "/logout", title: "Logout" },,
    { href: '/search', title: 'Search'}
];

const authRoutes = [
    { href: "/login", title: "Login" },
    { href: "/register", title: "Register" },
];


let navLinks = function navLinks(req, res, next) {
    if (req.session.currentUser) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = authRoutes;
    }
    // locals
    next();
};

module.exports = navLinks
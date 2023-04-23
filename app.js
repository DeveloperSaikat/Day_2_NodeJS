const express = require('express'); // Importing the express framework 
const bodyParser = require('body-parser'); //Importing this for parsing request body
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');
const mongoConnect = require('./util/database').mongoConnect;

const app = express(); //Invoking the express framework returns a function

app.set('view engine', 'ejs'); //This sets the templating engine that has to be used
app.set('views', 'views'); //This is done to let the templating engine know where the views are

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //This is required to access CSS files placed under public folder

app.use((req, res, next) => {
    User.findById('643a6c6250a8a75d4d589675')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        });
})

//The order in which the 'routes' are called still matters
app.use('/admin', adminRoutes.router);
app.use('/product', shopRoutes);

//Adding a wildcard 
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'}); //We can chain several methods but 'send' has to be the last one
})

mongoConnect(() => {
    app.listen(3000); //This invokes the createServer and passes itself as a parameter and listen on the provided port
})
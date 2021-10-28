const path = require('path');
require('dotenv').config({
    path: "./config/.env"
});
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');



// !passport Config
require('./config/passport');

const app = express();

// ! cookie parser
app.use(cookieParser());

//!DATABASE
const connectDB = require('./config/db');
connectDB();

// ! Body Parser 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ! flash
app.use(flash());

// ! session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))


// !passport
app.use(passport.initialize());
app.use(passport.session());



// !VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "./layouts/mainLayout.ejs");
app.use(expressLayouts);

// !Public Routes
app.use(express.static(path.join(__dirname, "public")))



// * router 
app.use("/", require('./src/components/public/publicRouter'));
app.use("/auth", require('./src/components/user/userRouter'));

// *admin router
app.use("/admin", require('./src/components/admin/public/adminRouter'));
app.use("/admin", require('./src/components/admin/categories/categoriesRouter'));
app.use("/admin", require('./src/components/admin/blogs/blogRouter'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
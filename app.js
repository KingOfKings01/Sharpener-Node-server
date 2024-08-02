// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");

// const adminRoutes = require("./routes/admin");
// const shopRouters = require("./routes/shop");
// const contactRouters = require("./routes/contact");
// const successRouters = require("./routes/success");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")))

// //todo apply root path with routes Note: '/' is important before name
// app.use('/admin', adminRoutes);
// app.use(contactRouters);
// app.use(successRouters);
// app.use(shopRouters);


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const db = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRouters = require("./routes/contact");
const successRouters = require("./routes/success");

db.execute('SELECT * FROM products')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(contactRouters);
app.use(successRouters);
app.use(shopRoutes);


app.use(errorController.get404);


app.listen(4000);

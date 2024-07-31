const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRouters = require("./routes/shop");
const contactRouters = require("./routes/contact");
const successRouters = require("./routes/success");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))

//todo apply root path with routes Note: '/' is important before name
app.use('/admin', adminRoutes);
app.use(contactRouters);
app.use(successRouters);
app.use(shopRouters);

// If path is not exist them show error 404 page not found
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(4000);

const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRouters = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//todo apply root path with routes Note: '/' is important before name
app.use('/admin', adminRoutes);
app.use(shopRouters);

// If path is not exist them show error 404 page not found
app.use((req, res, next) => {
  console.log(req.path)
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(4000);

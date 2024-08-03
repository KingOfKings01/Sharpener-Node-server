const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactRouters = require("./routes/contact");
const successRouters = require("./routes/success");
const Product = require("./models/product");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.error(error);
    });
});

app.use("/admin", adminRoutes);
app.use(contactRouters);
app.use(successRouters);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync({ force: false }) // if true we are forcing because we want to force update and add new relation on the database
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "John", email: "join@example.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

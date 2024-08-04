const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactRouters = require("./routes/contact");
const successRouters = require("./routes/success");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");

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

// Relationships defined
// One To Many
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// One To One
User.hasOne(Cart);
Cart.belongsTo(User);

// Many To Many
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//* Run server and sequelize
  async function run() {
    try {
      //todo: force:true if you need to rewrite the schema
      await sequelize.sync({ force: false }) 

      //todo: find a way to create user only if it does not exist
      const user = await User.findByPk(1)
      if (!user) 
        await User.create({ name: "John", email: "join@example.com" })
      
      //todo: find a way to create cart only if it does not exist
      const cart = await user.createCart()
      
      app.listen(4000, ()=>console.log('Server running on port 4000'))
    } catch (err) {
      console.log(err)
    }
  }

  run()
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(`<form action='/products' method='POST'>
              <h1>Add Product Form</h1>
              <div>
                <label>Title</label>  
                <input type='text' name='title'>
              </div>
              <br>
              <div>
              <label>Size</label>  
              <input type='number' min="0.1" step="0.1" name='size'>
              </div>
              <br>
              <input type='submit'>
            </form>`);
});

app.post("/products", (req, res, next) => {
  const {title, size}= req.body
  console.log(`title=${title} size=${size}`);
  res.send(`<h1>Products Page</h1><p><b>Title:</b> ${title}</p><p><b>Size:</b> ${size}</p>`);
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(4000);

const express = require('express')

const router = express.Router()

router.
get("/add-product", (req, res, next) => {
    res.send(`<form action='/admin/add-product' method='POST'>
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
  })
  .post("/add-product", (req, res, next) => {
    const {title, size}= req.body
    console.log(`title=${title} size=${size}`);
    res.send(`<h1>Products Page</h1>
        <p><b>Title:</b> ${title}</p>
        <p><b>Size:</b> ${size}</p>`);
  });
  

module.exports = router
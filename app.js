const http = require("http")
const express = require("express")

const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use((req, res, next) => {
  res.send({ key1: "value" })
  // res.send("<h1>value</h1>")
})

app.listen(4000)

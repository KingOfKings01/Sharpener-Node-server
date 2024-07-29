const http = require("http");

const server = http.createServer((req, res)=>{
    console.log(req.url)
    console.log()
    console.log(req.headers)
    console.log()
    console.log(req.method)
    console.log()
    
    res.setHeader('Content-Type', 'text/html');
    let message = ""
    if(req.url == '/home'){
        message = "Welcome Home"
    } else if(req.url == '/about'){
        message = "Welcome to About Us page"
    } else if(req.url == '/node'){
        message = "Welcome to my Node js project"
    }
    
    res.write(`<html>
    <head><title>My First Page</title></head>    
    <body><h1>${message}</h1></body>
    </html>`)
    res.end()
})

server.listen(4000)
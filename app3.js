const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`<html>
            <head><title>My First Page</title></head>
             <body>
              <form action="/message" method="POST">
               <input type="text">
               <button type="submit">Send</button>
              </form>
             </body>
            </html>`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // create a new message file
    fs.writeFileSync('message.txt', "DUMMY")
    // change the statues
    res.statusCode = 302;
    // reload the / root page
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
  <head><title>My First Page</title></head>
   <body>
    <h1>Hello from my Node js Server!</h1>
   </body>
  </html>`);
  res.end();
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

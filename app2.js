const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
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
    return res.end()
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

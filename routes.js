const fs = require("fs");
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        if (method === "GET") {
            fs.readFile("message.txt", "utf8", (err, data) => {
                if (err) data = "No message found";
                 data = data.split("+").join(" ")
    
          res.write(`
              <html>
              <head><title>Enter Message</title></head>
              <body>
              ${(data)}
              <form action="/" method="POST">
              <input type="text" name="message">
              <button type="submit">Send</button>
            </form>
          </body>
          </html>
        `);
          return res.end();
        });
      } else if (method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
          body.push(chunk);
        });
        return req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split("=")[1];
          fs.writeFile("message.txt", message, (err) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "text/plain");
              res.write("Failed to write message to file");
              return res.end();
            }
            res.statusCode = 302;
            res.setHeader("Location", "/");
            res.end();
          });
        });
      }
    }
}

exports.handler = requestHandler;
exports.someText = 'Some hard coded text for testing purposes';
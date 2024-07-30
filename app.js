const http = require("http");
const routes = require("./routes")

console.log(routes.someText)

const server = http.createServer(routes.handler);

server.listen(4000, () => {
  console.log("Server running on port 4000");
});

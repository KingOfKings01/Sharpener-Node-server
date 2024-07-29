# Sharpener-Node-server


if (url === '/' && method === 'GET') {
    fs.readFile('message.txt', (err, data) => {
      if (err) {
        data = 'No message found';
      }

      res.write(`
        <html>
        <head><title>Enter Message</title></head>
        <body>
          <h1>Current Message: ${data}</h1>
          <form action="/" method="POST">
            <input type="text" name="message">
            <button type="submit">Send</button>
          </form>
        </body>
        </html>
      `);
      return res.end();
    });
  }
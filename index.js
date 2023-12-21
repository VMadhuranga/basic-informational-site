const fsPromises = require("node:fs/promises");
const url = require("node:url");
const http = require("node:http");

const hostName = "127.0.0.1";
const port = 8080;

const server = http.createServer(async (req, res) => {
  try {
    const myURL = url.parse(req.url, true);
    let fileName;

    if (myURL.pathname !== "/" && myURL.pathname !== "/index") {
      fileName = "." + myURL.pathname + ".html";
    } else if (myURL.pathname === "/") {
      fileName = "./index.html";
    }

    const data = await fsPromises.readFile(fileName, { encoding: "utf8" });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  } catch (error) {
    const data = await fsPromises.readFile("./404.html", { encoding: "utf8" });

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  }
});

server.listen(port, hostName, () => {
  console.log(`Server running on http://${hostName}:${port}/`);
});

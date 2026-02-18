const path = require("node:path");
const Fastiy = require("fastify");
const { readFileSync } = require("node:fs");
const fastifyStatic = require("@fastify/static");
const React = require("react");
const ReactDOMServer = require("react-server-dom-webpack/server");
const App = require("../src/App").default;

const MANIFEST = readFileSync(
  path.resolve(__dirname, "../dist/react-client-manifest.json"),
  "utf-8",
);
const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT || 3000;

async function start() {
  const app = Fastiy({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    },
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, "../dist"),
    prefix: "/assets/",
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, "../public"),
    prefix: "/",
    decorateReply: false,
  });

  app.get("/", async function rootHandler(req, res) {
    const html = readFileSync(
      path.resolve(__dirname, "../dist/index.html"),
      "utf-8",
    );
    res.type("text/html").send(html);
  });

  app.get("/react-flight", async function reactFlightHandler(req, res) {
    res.header("Content-Type", "application/octet-stream");
    const { pipe } = ReactDOMServer.renderToPipeableStream(
      React.createElement(App),
      MODULE_MAP,
    );
    pipe(res.raw);
  });

  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Server is listening on port ${PORT}`);
}

module.exports = start;

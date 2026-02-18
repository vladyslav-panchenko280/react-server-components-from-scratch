require("react-server-dom-webpack/node-register")();

require("@babel/register")({
  ignore: [/node_modules/],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
});

require("./server")();

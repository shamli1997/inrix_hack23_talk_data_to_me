const express = require("express");
const fetch = require("node-fetch");
const { response } = require("express");
const app = express();
const port = 5000;
app.set("json spaces", 2);

//Starting server using listen function
app.listen(port, function () {
  console.log("Server has been started at " + port);
});

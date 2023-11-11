import express from "express";

import inrixRouter from "./routes/inrix.routes.js";
import locationRouter from "./routes/location.routes.js";

const app = express();
const port = 1000;
app.set("json spaces", 2);

//Starting server using listen function

app.use("/inrix", inrixRouter);
app.use("/location", locationRouter);

const startServer = async () => {
  try {
    app.listen(port, function () {
      console.log("Server has been started at " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

import express from "express";
import cors from "cors"

import locationRouter from "./routes/location.routes.js";

const app = express();
app.use(cors());
const port = 4001;
app.set("json spaces", 2);

//Starting server using listen function

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

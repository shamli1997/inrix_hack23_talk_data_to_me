import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/api.routes.js";
import profileRouter from "./routes/profile.routes.js";

dotenv.config();

const app = express();
app.use(cors());
// app.use(axios);
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/api", apiRouter);
app.use("/profile", profileRouter);

const startServer = async () => {
    try {

        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();

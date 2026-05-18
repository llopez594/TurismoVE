import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: env.frontendUrl,
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "API REST de TurismoVE funcionando correctamente."
    });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
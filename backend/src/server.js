import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
    console.log(`Servidor TurismoVE ejecutándose en http://localhost:${env.port}`);
});
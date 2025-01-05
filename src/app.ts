import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { Environment } from "./utils/apiUrl";
import { ConnectDatabase } from "./config/dbconfig";
import { config } from "./config/configEnv";
import { rateLimiter } from "./middleware/rateLimiter";
import { allFileServicesRouter } from "./routes/allFileServicesRoute";
import { swaggerDocs } from "./swaggerConfig/swagger";
const swaggerUi = require("swagger-ui-express");

const port = config?.PORT || 8010;
const env = config?.NODE_ENV || "development";
export const app: Express = express();
new ConnectDatabase(config?.MONGO_URI_USER).connectDB(); // Calling db connection
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(rateLimiter);

app.get("/", (req, res) => {
  console.log("backend running successfully");
  res.send("backend running successfully");
}); // creating api endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", allFileServicesRouter);

app.listen(port, () => {
  console.log(`Env: ${env} => Server Listening on http://localhost:${port}`);
});
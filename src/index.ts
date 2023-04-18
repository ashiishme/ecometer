import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { getEnv } from "./getEnv";
import { routes } from "./routes";
import dataSource from "./database/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach(({ path, method, controller }) => {
  const route = `/api/v1${path}`;
  app[method](route, async (req, res) => {
    try {
      await new controller().handle(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });
  console.info(`==> API Route ${route} registered with ${method} method`);
});

const PORT = Number(getEnv("PORT")) || 8080;

// startup
(async () => {
  try {
    await dataSource.initialize();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect with a database: ", error);
    process.exit(1);
  }
})();

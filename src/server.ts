import express, { Express } from "express";
import { RegisterRoutes } from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import initSwagger from "./config/swagger";
import initMongoDB from "./config/mongodb";
import { errorHandler } from "./utils/error-handler";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

initMongoDB()
  .then(() => {
    console.log("⚡[Server]: Connect to database success");

    initSwagger(app);

    RegisterRoutes(app);

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`⚡[Server]: Server is running at https://localhost:${port}`);
      console.log(
        `⚡️[Swagger]: Swagger is running at http://localhost:${port}/docs`
      );
    });
  })
  .catch((error) => {
    console.log("⚠️[Server]: Cannot connect to database ");
    console.log(error);
  });

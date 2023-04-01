import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./swagger.json")));
});

RegisterRoutes(app);

app.listen(port, () => {
  console.log(`⚡[Server]: Server is running at https://localhost:${port}`);
  console.log(
    `⚡️[swagger]: Swagger is running at http://localhost:${port}/docs`
  );
});

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import valuesNumberMiddleware from "./valuesNumberMiddleware";

const app: Express = express();
const port = process.env.PORT || 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(valuesNumberMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/addition", (req, res) => {
  const { value1, value2 } = req.body;
  res.send({ result: Number(value1) + Number(value2) });
});

app.post("/substraction", (req, res) => {
  const { value1, value2 } = req.body;
  res.send({ result: Number(value1) - Number(value2) });
});

app.post("/multiplication", (req, res) => {
  const { value1, value2 } = req.body;
  res.send({ result: Number(value1) * Number(value2) });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

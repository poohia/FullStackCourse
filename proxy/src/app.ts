import express from "express";
import axios from "axios";
import { endPointServiceUserHello, urlServiceUser } from "./types";

const app = express();
const port = 8000;

app.get("/api", (_, res) => {
  res.send("Hello API");
});

app.get("/api/.user", (_, res) => {
  axios
    .get(`${urlServiceUser}${endPointServiceUserHello}`)
    .then((onfulfilled) => {
      res.send(onfulfilled.data);
    });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

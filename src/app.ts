import express, { type Request } from "express";
import { webhookRouter } from "./routes/webhook.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(
  express.json({
    limit: "1mb",
    verify: (request, _response, buffer) => {
      (request as Request).rawBody = Buffer.from(buffer);
    },
  }),
);

app.get("/", (_request, response) => {
  response.json({
    service: "chatIA",
    status: "ok",
  });
});

app.use("/webhook", webhookRouter);

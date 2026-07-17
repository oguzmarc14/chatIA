import { Router } from "express";
import { requireEnvironment } from "../config/env.js";
import { verifyMetaSignature } from "../middleware/verify-signature.js";
import { processWebhook } from "../services/message-handler.service.js";
import type { WhatsAppWebhookPayload } from "../types/whatsapp.js";

export const webhookRouter = Router();

webhookRouter.get("/", (request, response) => {
  const mode = request.query["hub.mode"];
  const token = request.query["hub.verify_token"];
  const challenge = request.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === requireEnvironment("WEBHOOK_VERIFY_TOKEN") &&
    typeof challenge === "string"
  ) {
    response.status(200).send(challenge);
    return;
  }

  response.sendStatus(403);
});

webhookRouter.post("/", verifyMetaSignature, async (request, response) => {
  try {
    const payload = request.body as WhatsAppWebhookPayload;

    if (payload.object !== "whatsapp_business_account") {
      response.sendStatus(404);
      return;
    }

    const processedMessages = await processWebhook(payload);
    response.status(200).json({ received: true, processedMessages });
  } catch (error) {
    console.error("No se pudo procesar el webhook", error);
    response.sendStatus(500);
  }
});


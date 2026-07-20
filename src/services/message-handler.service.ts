import type {
  IncomingTextMessage,
  WhatsAppWebhookPayload,
} from "../types/whatsapp.js";
import { generateAssistantReply } from "./ai.service.js";
import { sendTextMessage } from "./whatsapp.service.js";

export function extractTextMessages(
  payload: WhatsAppWebhookPayload,
): IncomingTextMessage[] {
  const messages: IncomingTextMessage[] = [];

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const phoneNumberId = change.value?.metadata?.phone_number_id;

      if (!phoneNumberId) continue;

      for (const message of change.value?.messages ?? []) {
        const from = message.from;
        const text = message.text?.body?.trim();
        const messageId = message.id;

        if (message.type === "text" && from && text && messageId) {
          messages.push({ from, text, messageId, phoneNumberId });
        }
      }
    }
  }

  return messages;
}

export async function processWebhook(
  payload: WhatsAppWebhookPayload,
): Promise<number> {
  const messages = extractTextMessages(payload);

  for (const message of messages) {
    console.info("Mensaje recibido", {
      messageId: message.messageId,
      from: message.from,
      text: message.text,
      phoneNumberId: message.phoneNumberId,
    });

    try {
      const assistantReply = await generateAssistantReply(message.text);

      await sendTextMessage({
        to: message.from,
        phoneNumberId: message.phoneNumberId,
        text: assistantReply,
      });

      console.info("Respuesta inteligente enviada", {
        messageId: message.messageId,
      });
    } catch (error) {
      console.error(
        "No se pudo generar o enviar la respuesta",
        error instanceof Error ? error.message : "Error desconocido",
      );
    }
  }

  return messages.length;
}
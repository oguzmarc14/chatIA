import { requireEnvironment } from "../config/env.js";

interface SendTextMessageInput {
  to: string;
  text: string;
  phoneNumberId: string;
}

interface MetaErrorResponse {
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
}

function normalizeWhatsAppNumber(number: string): string {
  const digits = number.replace(/\D/g, "");

  // Meta entrega algunos números mexicanos como 521XXXXXXXXXX,
  // pero el envío requiere el formato 52XXXXXXXXXX.
  if (digits.startsWith("521") && digits.length === 13) {
    return `52${digits.slice(3)}`;
  }

  return digits;
}

export async function sendTextMessage({
  to,
  text,
  phoneNumberId,
}: SendTextMessageInput): Promise<void> {
  const accessToken = requireEnvironment("WHATSAPP_ACCESS_TOKEN");
  const graphVersion = requireEnvironment("META_GRAPH_API_VERSION");
  const url = `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`;

  const normalizedRecipient = normalizeWhatsAppNumber(to);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: normalizedRecipient,
      type: "text",
      text: {
        preview_url: false,
        body: text,
      },
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as MetaErrorResponse;
    const message = data.error?.message ?? `Error HTTP ${response.status}`;

    throw new Error(`Meta no pudo enviar el mensaje: ${message}`);
  }
}